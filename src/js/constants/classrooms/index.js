import MBF from './MBF';
import M1F from './M1F';
import M2F from './M2F';
import M3F from './M3F';
import M4F from './M4F';
import M5F from './M5F';
import M6F from './M6F';
import A1F from './A1F';
import A2F from './A2F';
import A3F from './A3F';
import A4F from './A4F';
import A5F from './A5F';

const classroomGroupMap = {
    'MBF': MBF,
    'M1F': M1F,
    'M2F': M2F,
    'M3F': M3F,
    'M4F': M4F,
    'M5F': M5F,
    'M6F': M6F,
    'A1F': A1F,
    'A2F': A2F,
    'A3F': A3F,
    'A4F': A4F,
    'A5F': A5F,
};

export const getClassroomHtmlMap = (classroomGrpupName) => {
    return classroomGroupMap[classroomGrpupName] || {};
};
