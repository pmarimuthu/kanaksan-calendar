import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <IconButton 
      onClick={toggleMode} 
      color="inherit"
      aria-label="toggle theme"
    >
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

export default ThemeToggle;