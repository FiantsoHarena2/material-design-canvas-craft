
import React, { useState } from 'react';
import { CourseTable } from '@/components/CourseTable';
import { CourseDetails } from '@/components/CourseDetails';
import { LevelSelector } from '@/components/LevelSelector';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';

export interface Course {
  course_ref: string;
  course_name: string;
  weightedAVG: number;
  credits: number;
  exams: {
    name: string;
    score: number;
    total: number;
    weight: number;
  }[];
}

const mockCourses: Course[] = [
  {
    course_ref: 'PROG1',
    course_name: 'Algorithmique',
    weightedAVG: 16.725,
    credits: 6,
    exams: [
      { name: 'Examen 1', score: 12, total: 20, weight: 0.2 },
      { name: 'Examen 2', score: 18, total: 20, weight: 0.6 },
      { name: 'Examen N', score: 10, total: 20, weight: 0.4 }
    ]
  },
  {
    course_ref: 'MATH1',
    course_name: 'Mathématiques',
    weightedAVG: 14.5,
    credits: 4,
    exams: [
      { name: 'Examen 1', score: 15, total: 20, weight: 0.3 },
      { name: 'Examen 2', score: 14, total: 20, weight: 0.7 }
    ]
  },
  {
    course_ref: 'PHYS1',
    course_name: 'Physique',
    weightedAVG: 12.8,
    credits: 5,
    exams: [
      { name: 'Examen 1', score: 11, total: 20, weight: 0.4 },
      { name: 'Examen 2', score: 14, total: 20, weight: 0.6 }
    ]
  }
];

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [globalAverage] = useState(14.67);

  const filteredCourses = mockCourses.filter(course =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Vue individuelle pour les étudiants sur TOUS les notes et TOUS les cours
                </h1>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Télécharger relevé</span>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LevelSelector value={selectedLevel} onChange={setSelectedLevel} />
              <div className="text-lg font-medium">
                Moyenne globale: <span className="text-blue-600 font-semibold">{globalAverage.toFixed(2)}</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Table */}
          <Card className="p-6 shadow-md">
            <CourseTable 
              courses={filteredCourses}
              onCourseSelect={setSelectedCourse}
            />
          </Card>

          {/* Course Details */}
          <Card className="p-6 shadow-md">
            <CourseDetails course={selectedCourse} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
