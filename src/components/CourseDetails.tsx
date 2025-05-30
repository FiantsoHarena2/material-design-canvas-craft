
import React from 'react';
import { Course } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CourseDetailsProps {
  course: Course | null;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  if (!course) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <Select value="PROG1">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="PROG1">PROG1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">Vue détaillée pour les étudiants sur UN cours</p>
          <p className="text-sm mt-2">Sélectionnez un cours pour voir les détails</p>
        </div>
      </div>
    );
  }

  const courseAverage = course.weightedAVG;
  const getStatusColor = (avg: number) => {
    if (avg >= 16) return 'text-green-600';
    if (avg >= 12) return 'text-blue-600';
    if (avg >= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusText = (avg: number) => {
    if (avg >= 16) return 'validé';
    if (avg >= 12) return 'en cours';
    if (avg >= 10) return 'validé';
    return 'échec';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <Select value={course.course_ref}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            <SelectItem value={course.course_ref}>{course.course_ref}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Vue détaillée pour les étudiants sur UN cours</h2>
        
        <div className="space-y-2">
          <p className="text-lg">
            moyenne sur le cours : <span className="font-semibold text-blue-600">{courseAverage.toFixed(2)}</span>
          </p>
          <p className="text-base">
            statut : <span className={`font-medium ${getStatusColor(courseAverage)}`}>
              {getStatusText(courseAverage)}
            </span>
          </p>
        </div>

        <Card className="p-4 border border-gray-200">
          <div className="space-y-3">
            {course.exams.map((exam, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-gray-700">{exam.name} :</span>
                <div className="text-right">
                  <span className="font-medium">{exam.score} / {exam.total}</span>
                  <span className="text-gray-500 ml-4">poids : {exam.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
