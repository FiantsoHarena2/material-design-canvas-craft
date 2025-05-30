
import React from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/pages/Index';

interface CourseTableProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({ courses, onCourseSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Courses Overview</h2>
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">course_ref</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">course_name</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">WeightedAVG</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Credits</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.course_ref} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2 font-medium text-gray-900">{course.course_ref}</td>
                <td className="py-3 px-2 text-gray-700">{course.course_name}</td>
                <td className="py-3 px-2 font-medium text-blue-600">{course.weightedAVG.toFixed(3)}</td>
                <td className="py-3 px-2 text-gray-700">{course.credits}</td>
                <td className="py-3 px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCourseSelect(course)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    See details...
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
