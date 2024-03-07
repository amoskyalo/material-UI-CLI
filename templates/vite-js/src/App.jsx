import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import themeConfig from './Theme';
import MaterialUISwitch from './Components/Switch/MaterialUISwitch'

function App() {
  const [mode, setMode] = useState('dark');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme(themeConfig(mode));

  const DocumentationCard = ({ link, title, description }) => (
    <Grid item lg={6} xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Link href={link} target="_blank" rel="noopener">
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h6">{title}</Typography>
              <ArrowRightAltIcon />
            </Stack>
          </Link>
          <Typography variant="h6" sx={{ fontSize: 16, mt: 1 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const AppContent = () => (
    <Box className="App">
      <Box sx={{ display: 'flex', justifyContent: 'right', py: 2 }}>
        <MaterialUISwitch
          label={mode}
          checked={mode === 'dark'}
          onChange={toggleColorMode}
        />
      </Box>

      <Box className="App-body">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: 2,
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">MUI</Typography>
          <AddIcon fontSize="large" />
          <Typography variant="h4">React</Typography>
          <AddIcon fontSize="large" />
          <Typography variant="h4">Vite</Typography>
        </Box>

        <Grid container spacing={2} sx={{ maxWidth: 700, mt: 4 }}>
          <DocumentationCard
            link="https://mui.com/material-ui/getting-started/"
            title="MUI Documentation"
            description="Find in-depth about ready to use material design components!"
          />
          <DocumentationCard
            link="https://react.dev/"
            title="React Documentation"
            description="Explore the official guide to building user interfaces with React."
          />
          <DocumentationCard
            link="https://react.dev/"
            title="Vite Documentation"
            description="Learn about vite, a tool that aims to provide a faster and leaner development."
          />
        </Grid>
      </Box>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  )
}

export default App
