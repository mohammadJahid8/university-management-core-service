import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  return await prisma.academicSemester.create({
    data,
  });
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
