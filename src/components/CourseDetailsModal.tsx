
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Course } from '@/pages/Index';

interface CourseDetailsModalProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ 
  course, 
  open, 
  onClose 
}) => {
  if (!course) return null;

  const getStatusColor = (avg: number) => {
    if (avg >= 16) return 'success';
    if (avg >= 12) return 'primary';
    if (avg >= 10) return 'warning';
    return 'error';
  };

  const getStatusText = (avg: number) => {
    if (avg >= 16) return 'validé';
    if (avg >= 12) return 'en cours';
    if (avg >= 10) return 'validé';
    return 'échec';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          Détails du cours
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {course.course_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Référence: {course.course_ref} | Crédits: {course.credits}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="body1">
              Moyenne sur le cours:
            </Typography>
            <Chip 
              label={course.weightedAVG.toFixed(2)} 
              color="primary"
              variant="filled"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              Statut:
            </Typography>
            <Chip 
              label={getStatusText(course.weightedAVG)}
              color={getStatusColor(course.weightedAVG) as any}
              variant="filled"
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Détail des évaluations
        </Typography>

        <Paper variant="outlined" sx={{ p: 2 }}>
          {course.exams.map((exam, index) => (
            <Box key={index} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight="medium">
                  {exam.name}
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body1" fontWeight="bold">
                    {exam.score} / {exam.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Poids: {exam.weight}
                  </Typography>
                </Box>
              </Box>
              {index < course.exams.length - 1 && <Divider sx={{ mt: 1 }} />}
            </Box>
          ))}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
