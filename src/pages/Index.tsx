
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
  level: string;
  exams: {
    name: string;
    score: number;
    total: number;
    weight: number;
  }[];
}

const mockCoursesByLevel: Course[] = [
  // L1 Courses
  {
    course_ref: 'MATH101',
    course_name: 'Mathématiques fondamentales',
    weightedAVG: 15.2,
    credits: 6,
    level: 'L1',
    exams: [
      { name: 'Contrôle continu 1', score: 14, total: 20, weight: 0.2 },
      { name: 'Contrôle continu 2', score: 16, total: 20, weight: 0.2 },
      { name: 'Examen final', score: 15, total: 20, weight: 0.6 }
    ]
  },
  {
    course_ref: 'PROG101',
    course_name: 'Introduction à la programmation',
    weightedAVG: 16.8,
    credits: 5,
    level: 'L1',
    exams: [
      { name: 'TP 1', score: 18, total: 20, weight: 0.3 },
      { name: 'TP 2', score: 16, total: 20, weight: 0.3 },
      { name: 'Projet final', score: 17, total: 20, weight: 0.4 }
    ]
  },
  {
    course_ref: 'PHYS101',
    course_name: 'Physique générale',
    weightedAVG: 13.5,
    credits: 4,
    level: 'L1',
    exams: [
      { name: 'Examen 1', score: 12, total: 20, weight: 0.4 },
      { name: 'Examen 2', score: 15, total: 20, weight: 0.6 }
    ]
  },
  {
    course_ref: 'ANG101',
    course_name: 'Anglais scientifique',
    weightedAVG: 14.7,
    credits: 3,
    level: 'L1',
    exams: [
      { name: 'Oral', score: 15, total: 20, weight: 0.5 },
      { name: 'Écrit', score: 14, total: 20, weight: 0.5 }
    ]
  },
  // L2 Courses
  {
    course_ref: 'ALGO201',
    course_name: 'Algorithmique avancée',
    weightedAVG: 17.3,
    credits: 6,
    level: 'L2',
    exams: [
      { name: 'Contrôle 1', score: 16, total: 20, weight: 0.25 },
      { name: 'Contrôle 2', score: 18, total: 20, weight: 0.25 },
      { name: 'Projet', score: 17, total: 20, weight: 0.5 }
    ]
  },
  {
    course_ref: 'BD201',
    course_name: 'Bases de données',
    weightedAVG: 15.9,
    credits: 5,
    level: 'L2',
    exams: [
      { name: 'TP SQL', score: 17, total: 20, weight: 0.4 },
      { name: 'Examen théorique', score: 15, total: 20, weight: 0.6 }
    ]
  },
  {
    course_ref: 'STAT201',
    course_name: 'Statistiques',
    weightedAVG: 12.8,
    credits: 4,
    level: 'L2',
    exams: [
      { name: 'DS 1', score: 11, total: 20, weight: 0.3 },
      { name: 'DS 2', score: 14, total: 20, weight: 0.7 }
    ]
  },
  {
    course_ref: 'WEB201',
    course_name: 'Développement web',
    weightedAVG: 16.5,
    credits: 5,
    level: 'L2',
    exams: [
      { name: 'Site statique', score: 16, total: 20, weight: 0.3 },
      { name: 'Application dynamique', score: 17, total: 20, weight: 0.7 }
    ]
  },
  // L3 Courses
  {
    course_ref: 'IA301',
    course_name: 'Intelligence artificielle',
    weightedAVG: 18.2,
    credits: 6,
    level: 'L3',
    exams: [
      { name: 'Machine Learning', score: 18, total: 20, weight: 0.4 },
      { name: 'Réseaux de neurones', score: 19, total: 20, weight: 0.4 },
      { name: 'Projet IA', score: 17, total: 20, weight: 0.2 }
    ]
  },
  {
    course_ref: 'SEC301',
    course_name: 'Sécurité informatique',
    weightedAVG: 14.6,
    credits: 5,
    level: 'L3',
    exams: [
      { name: 'Cryptographie', score: 13, total: 20, weight: 0.3 },
      { name: 'Audit sécurité', score: 16, total: 20, weight: 0.7 }
    ]
  },
  {
    course_ref: 'STAGE301',
    course_name: 'Stage en entreprise',
    weightedAVG: 16.0,
    credits: 8,
    level: 'L3',
    exams: [
      { name: 'Rapport de stage', score: 16, total: 20, weight: 0.6 },
      { name: 'Soutenance', score: 16, total: 20, weight: 0.4 }
    ]
  },
  {
    course_ref: 'PROJ301',
    course_name: 'Projet de fin d\'études',
    weightedAVG: 17.8,
    credits: 7,
    level: 'L3',
    exams: [
      { name: 'Développement', score: 18, total: 20, weight: 0.5 },
      { name: 'Documentation', score: 17, total: 20, weight: 0.2 },
      { name: 'Présentation', score: 18, total: 20, weight: 0.3 }
    ]
  }
];

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses by selected level
  const coursesByLevel = mockCoursesByLevel.filter(course => course.level === selectedLevel);
  
  // Then filter by search term
  const filteredCourses = coursesByLevel.filter(course =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate global average for the selected level
  const globalAverage = coursesByLevel.length > 0 
    ? coursesByLevel.reduce((sum, course) => sum + (course.weightedAVG * course.credits), 0) / 
      coursesByLevel.reduce((sum, course) => sum + course.credits, 0)
    : 0;

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
                  Tableau de Bord Étudiant - Suivi des Notes et Résultats
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
                Moyenne globale {selectedLevel}: <span className="text-blue-600 font-semibold">{globalAverage.toFixed(2)}</span>
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
