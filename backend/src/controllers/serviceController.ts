import { Request, Response } from 'express';
import { ServiceCategoryModel } from '../models/ServiceCategory.js';
import { ServiceItemModel } from '../models/ServiceItem.js';
import { AuditLogModel } from '../models/AuditLog.js';
import { ApiError } from '../utils/apiError.js';

export const getCategories = async (req: Request, res: Response) => {
  const categories = await ServiceCategoryModel.find({ isActive: true });
  // Map to frontend interface structure
  const formatted = categories.map((c) => ({
    id: c.categoryId,
    name: c.name,
    icon: c.icon,
    color: c.color,
    startingPrice: c.startingPrice
  }));
  res.json({ success: true, data: formatted });
};

export const getServices = async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const filter: any = { isAvailable: true };

  if (category && category !== 'all') {
    filter.categoryId = category;
  }

  if (search && typeof search === 'string') {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const services = await ServiceItemModel.find(filter).sort({ createdAt: -1 });

  const formatted = services.map((s) => ({
    id: s.serviceCode,
    categoryId: s.categoryId,
    title: s.title,
    description: s.description,
    shortDescription: s.shortDescription,
    price: s.price,
    originalPrice: s.originalPrice,
    discountPercentage: s.discountPercentage,
    rating: s.rating,
    reviewsCount: s.reviewsCount,
    duration: s.duration,
    imageUrl: s.imageUrl,
    badge: s.badge,
    inclusions: s.inclusions,
    exclusions: s.exclusions,
    requirements: s.requirements
  }));

  res.json({ success: true, data: formatted });
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const service = await ServiceItemModel.findOne({ serviceCode: id });

  if (!service) {
    throw ApiError.notFound(`Service with ID '${id}' not found`);
  }

  res.json({
    success: true,
    data: {
      id: service.serviceCode,
      categoryId: service.categoryId,
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price,
      originalPrice: service.originalPrice,
      discountPercentage: service.discountPercentage,
      rating: service.rating,
      reviewsCount: service.reviewsCount,
      duration: service.duration,
      imageUrl: service.imageUrl,
      badge: service.badge,
      inclusions: service.inclusions,
      exclusions: service.exclusions,
      requirements: service.requirements
    }
  });
};

export const createService = async (req: Request, res: Response) => {
  const data = req.body;
  const serviceCode = `srv-${Date.now()}`;

  const newService = await ServiceItemModel.create({
    ...data,
    serviceCode,
    originalPrice: data.originalPrice || Math.round(data.price * 1.3),
    discountPercentage: data.discountPercentage || 25,
    rating: 4.8,
    reviewsCount: 1
  });

  await AuditLogModel.create({
    logId: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    actor: 'admin@helpinghand.com',
    action: 'SERVICE_CATALOG_ADD',
    target: `Service #${serviceCode}`,
    details: `Created catalog item '${newService.title}'`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    severity: 'info'
  });

  res.status(201).json({
    success: true,
    data: {
      id: newService.serviceCode,
      categoryId: newService.categoryId,
      title: newService.title,
      description: newService.description,
      shortDescription: newService.shortDescription,
      price: newService.price,
      originalPrice: newService.originalPrice,
      discountPercentage: newService.discountPercentage,
      rating: newService.rating,
      reviewsCount: newService.reviewsCount,
      duration: newService.duration,
      imageUrl: newService.imageUrl,
      badge: newService.badge,
      inclusions: newService.inclusions,
      exclusions: newService.exclusions,
      requirements: newService.requirements
    }
  });
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const service = await ServiceItemModel.findOneAndUpdate(
    { serviceCode: id },
    { $set: updateData },
    { new: true }
  );

  if (!service) {
    throw ApiError.notFound(`Service with ID '${id}' not found`);
  }

  await AuditLogModel.create({
    logId: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    actor: 'admin@helpinghand.com',
    action: 'SERVICE_CATALOG_UPDATE',
    target: `Service #${id}`,
    details: `Updated service attributes for '${service.title}'`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    severity: 'warning'
  });

  res.json({
    success: true,
    data: {
      id: service.serviceCode,
      categoryId: service.categoryId,
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price,
      originalPrice: service.originalPrice,
      discountPercentage: service.discountPercentage,
      rating: service.rating,
      reviewsCount: service.reviewsCount,
      duration: service.duration,
      imageUrl: service.imageUrl,
      badge: service.badge,
      inclusions: service.inclusions,
      exclusions: service.exclusions,
      requirements: service.requirements
    }
  });
};
