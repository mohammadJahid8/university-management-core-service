import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { AcademicFaculty } from '@prisma/client';
import pick from '../../../shared/pick';

import { academicFacultyFilterableFields } from './academicDepartment';
import { AcademicFacultyService } from './academicDepartment.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  const academicFaculty = await AcademicFacultyService.createAcademicFaculty(
    data
  );

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: academicFaculty,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);

  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);

  const result = await AcademicFacultyService.getAllAcademicFaculties(
    filters,
    options
  );

  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAcademicFacultyId = catchAsync(async (req, res) => {
  const academicFaculty = await AcademicFacultyService.getAcademicFacultyById(
    req.params.id
  );

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: academicFaculty,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFacultyId,
};
