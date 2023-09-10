import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

import { AcademicSemester } from '@prisma/client';

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

export const AcademicSemesterController = {
  createAcademicSemester,
};
