import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

import { AcademicSemester } from '@prisma/client';
import pick from '../../../shared/pick';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;
  const academicSemester = await AcademicSemesterService.createAcademicSemester(
    data
  );

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: academicSemester,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);

  const result = await AcademicSemesterService.getAllAcademicSemesters(
    filters,
    options
  );

  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAcademicSemesterById = catchAsync(async (req, res) => {
  const academicSemester =
    await AcademicSemesterService.getAcademicSemesterById(req.params.id);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully',
    data: academicSemester,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
};
