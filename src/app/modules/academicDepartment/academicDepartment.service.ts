import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicFacultySearchableFields } from './academicDepartment';
import { IAcademicFacultyFilterRequest } from './academicDepartment.interface';

const createAcademicFaculty = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  return await prisma.academicFaculty.create({
    data,
  });
};

const getAllAcademicFaculties = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { searchTerm, ...rest } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicFacultySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(rest).length > 0) {
    andConditions.push({
      AND: Object.keys(rest).map(key => ({
        [key]: {
          equals: (rest as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.academicFaculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAcademicFacultyById = async (
  id: string
): Promise<AcademicFaculty | null> => {
  return await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFacultyById,
};
