import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  InputAdornment,
  Avatar,
  Button,
  Chip
} from '@mui/material';
import { Search, Download } from '@mui/icons-material';
import { CourseTable } from '@/components/CourseTable';
import { CourseDetailsModal } from '@/components/CourseDetailsModal';
import { LevelSelector } from '@/components/LevelSelector';

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
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        {/* Header Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300' }} />
              <Typography variant="h5" component="h1" fontWeight="medium">
                Tableau de Bord Étudiant - Suivi des Notes et Résultats
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              startIcon={<Download />}
              sx={{ textTransform: 'none' }}
            >
              Télécharger relevé
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <LevelSelector value={selectedLevel} onChange={setSelectedLevel} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6">
                  Moyenne globale {selectedLevel}:
                </Typography>
                <Chip 
                  label={globalAverage.toFixed(2)} 
                  color="primary" 
                  variant="filled"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Box>
            <TextField
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Paper>

        {/* Course Table */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <CourseTable 
            courses={filteredCourses}
            onCourseSelect={handleCourseSelect}
          />
        </Paper>

        {/* Course Details Modal */}
        <CourseDetailsModal 
          course={selectedCourse}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </Box>
    </Container>
  );
};

export default Index;
