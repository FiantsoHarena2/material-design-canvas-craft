
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip
} from '@mui/material';
import { Course } from '@/pages/Index';

interface CourseTableProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({ courses, onCourseSelect }) => {
  return (
    <div>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
        Aperçu des Cours
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Référence</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nom du cours</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Moyenne</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Crédits</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_ref} hover>
                <TableCell sx={{ fontWeight: 'medium' }}>{course.course_ref}</TableCell>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>
                  <Chip 
                    label={course.weightedAVG.toFixed(2)} 
                    color="primary" 
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => onCourseSelect(course)}
                    sx={{ textTransform: 'none' }}
                  >
                    Voir détails...
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
