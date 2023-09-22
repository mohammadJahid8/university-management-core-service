import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicDepartment.controller';
import { AcademicFacultyValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicFacultyValidation.createAcademicFaculty),
  AcademicFacultyController.createAcademicFaculty
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:id', AcademicFacultyController.getAcademicFacultyId);

export const AcademicDepartmentRoutes = router;
