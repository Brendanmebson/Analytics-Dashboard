import React, { useState, useEffect } from 'react';
import GridItem from '../UI/GridItem';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
  Divider,
  ButtonGroup,
  Tooltip,
  Avatar,
  Menu,
  MenuList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Snackbar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Refresh,
  Settings,
  Notifications,
  Download,
  Search,
  DateRange as DateRangeIcon, 
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  ShoppingCart,
  ExitToApp, 
  ExpandMore,
  Close,
  FilterList,
  ViewModule,
  Analytics,
  Insights,
  Warning,
  CheckCircle,
  Error,
  Info
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { useChartData } from '../../hooks/useChartData';
import { dataService } from '../../services/dataService';
import type { DateRange as DateRangeType, FilterOptions } from '../../types'; // ✅ Renamed import

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addNotification, notifications, unreadCount } = useNotifications();
  const { metrics, isConnected } = useRealTimeData();
  const chartData = useChartData();

  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // Filter states
  const [dateRange, setDateRange] = useState<DateRangeType>({ // ✅ Using renamed type
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
    preset: '7days'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  // Advanced analytics
  const [advancedAnalytics, setAdvancedAnalytics] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  // Chart colors
  const colors = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#7b1fa2'];

  // Auto-refresh
  useEffect(() => {
    if (user?.preferences.autoRefresh) {
      const interval = setInterval(() => {
        fetchAdvancedAnalytics();
      }, user.preferences.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [user?.preferences]);

  const fetchAdvancedAnalytics = async () => {
    try {
      setIsLoading(true);
      const analytics = await dataService.fetchAdvancedAnalytics();
      setAdvancedAnalytics(analytics);
      
      // Show anomaly notifications
      analytics.anomalies.forEach((anomaly: any) => {
        if (anomaly.severity === 'high') {
          addNotification({
            type: 'warning',
            title: 'Anomaly Detected',
            message: anomaly.description,
            persistent: true
          });
        }
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Failed to Load Analytics',
        message: 'Unable to fetch advanced analytics data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvancedAnalytics();
  }, []);

  const handleExportData = () => {
    setShowExportModal(true);
  };

  const handleRefresh = () => {
    setSnackbarMessage('Data refreshed successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    fetchAdvancedAnalytics();
  };

  const filteredMetrics = Object.values(metrics).filter(metric =>
    metric.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sample chart data for different visualizations
  const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    visitors: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    conversions: Math.floor(Math.random() * 100) + 50,
  }));

  const pieData = [
    { name: 'Desktop', value: 65, color: '#1976d2' },
    { name: 'Mobile', value: 30, color: '#2e7d32' },
    { name: 'Tablet', value: 5, color: '#ed6c02' }
  ];

  const MetricCard = ({ metric }: { metric: any }) => {
    const getTrendIcon = (trend: string) => {
      switch (trend) {
        case 'up': return <TrendingUp sx={{ color: 'success.main' }} />;
        case 'down': return <TrendingDown sx={{ color: 'error.main' }} />;
        default: return <TrendingUp sx={{ color: 'grey.500' }} />;
      }
    };

    const getMetricIcon = (name: string) => {
      switch (name.toLowerCase()) {
        case 'active visitors': return <People />;
        case 'revenue': return <AttachMoney />;
        case 'conversions': return <ShoppingCart />;
        case 'bounce rate': return <ExitToApp />; // ✅ Fixed icon
        default: return <Analytics />;
      }
    };

    return (
      <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Box display="flex" alignItems="center" mb={1}>
                {getMetricIcon(metric.name)}
                <Typography variant="body2" color="text.secondary" ml={1}>
                  {metric.name}
               </Typography>
             </Box>
             <Typography variant="h4" component="div" fontWeight="bold">
               {metric.name === 'Revenue' ? `$${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
               {metric.name === 'Bounce Rate' && '%'}
             </Typography>
             <Typography variant="caption" color="text.secondary">
               Last updated: {metric.timestamp.toLocaleTimeString()}
             </Typography>
           </Box>
           <Box display="flex" alignItems="center">
             {getTrendIcon(metric.trend)}
             <Typography 
               variant="body2" 
               color={metric.trend === 'up' ? 'success.main' : metric.trend === 'down' ? 'error.main' : 'text.secondary'}
               ml={0.5}
             >
               {Math.abs(metric.change).toFixed(1)}%
             </Typography>
           </Box>
         </Box>
       </CardContent>
     </Card>
   );
 };

 const ExportModal = () => (
   <Dialog open={showExportModal} onClose={() => setShowExportModal(false)} maxWidth="sm" fullWidth>
     <DialogTitle>Export Data</DialogTitle>
     <DialogContent>
       <Box sx={{ mt: 2 }}>
         <Typography variant="subtitle2" gutterBottom>Export Format</Typography>
         <ButtonGroup variant="outlined" fullWidth sx={{ mb: 3 }}>
           <Button>CSV</Button>
           <Button>JSON</Button>
           <Button>Excel</Button>
           <Button>PDF</Button>
         </ButtonGroup>
         
         <Typography variant="subtitle2" gutterBottom>Data Range</Typography>
         <FormControl fullWidth sx={{ mb: 2 }}>
           <Select defaultValue="current">
             <MenuItem value="current">Current View</MenuItem>
             <MenuItem value="filtered">Filtered Data</MenuItem>
             <MenuItem value="all">All Data</MenuItem>
           </Select>
         </FormControl>
         
         <FormControlLabel
           control={<Switch />}
           label="Include Charts (PDF only)"
         />
       </Box>
     </DialogContent>
     <DialogActions>
       <Button onClick={() => setShowExportModal(false)}>Cancel</Button>
       <Button variant="contained" onClick={() => setShowExportModal(false)}>Export</Button>
     </DialogActions>
   </Dialog>
 );

 const SettingsModal = () => (
   <Dialog open={showSettingsPanel} onClose={() => setShowSettingsPanel(false)} maxWidth="md" fullWidth>
     <DialogTitle>Settings</DialogTitle>
     <DialogContent>
       <Tabs value={0} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
         <Tab label="Profile" />
         <Tab label="Preferences" />
         <Tab label="Notifications" />
       </Tabs>
       
       <Box sx={{ mt: 2 }}>
         <TextField
           fullWidth
           label="Name"
           value={user?.name || ''}
           margin="normal"
         />
         <TextField
           fullWidth
           label="Email"
           value={user?.email || ''}
           margin="normal"
         />
         
         <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Display Preferences</Typography>
         <FormControlLabel
           control={<Switch checked={user?.preferences.autoRefresh} />}
           label="Auto-refresh data"
         />
         <FormControlLabel
           control={<Switch checked={user?.preferences.notifications} />}
           label="Enable notifications"
         />
       </Box>
     </DialogContent>
     <DialogActions>
       <Button onClick={() => setShowSettingsPanel(false)}>Cancel</Button>
       <Button variant="contained" onClick={() => setShowSettingsPanel(false)}>Save</Button>
     </DialogActions>
   </Dialog>
 );

 const NotificationDrawer = () => (
   <Drawer
     anchor="right"
     open={showNotificationCenter}
     onClose={() => setShowNotificationCenter(false)}
     sx={{ '& .MuiDrawer-paper': { width: 400 } }}
   >
     <Box sx={{ p: 2 }}>
       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
         <Typography variant="h6">Notifications</Typography>
         <IconButton onClick={() => setShowNotificationCenter(false)}>
           <Close />
         </IconButton>
       </Box>
       
       <ButtonGroup size="small" sx={{ mb: 2 }}>
         <Button>All ({notifications.length})</Button>
         <Button>Unread ({unreadCount})</Button>
       </ButtonGroup>
       
       <List>
         {notifications.slice(0, 10).map((notification) => (
           <ListItem key={notification.id} divider>
             <ListItemIcon>
               {notification.type === 'success' && <CheckCircle color="success" />}
               {notification.type === 'error' && <Error color="error" />}
               {notification.type === 'warning' && <Warning color="warning" />}
               {notification.type === 'info' && <Info color="info" />}
             </ListItemIcon>
             <ListItemText
               primary={notification.title}
               secondary={
                 <Box>
                   <Typography variant="body2">{notification.message}</Typography>
                   <Typography variant="caption" color="text.secondary">
                     {notification.timestamp.toLocaleString()}
                   </Typography>
                 </Box>
               }
             />
           </ListItem>
         ))}
       </List>
     </Box>
   </Drawer>
 );

 if (isLoading && !advancedAnalytics) {
   return (
     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
       <CircularProgress size={60} />
     </Box>
   );
 }

 return (
   <LocalizationProvider dateAdapter={AdapterDateFns}>
     <Box sx={{ flexGrow: 1, bgcolor: 'grey.100', minHeight: '100vh' }}>
       {/* Header */}
       <AppBar position="static" color="default" elevation={1}>
         <Toolbar>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Analytics Dashboard
           </Typography>
           
           <Box display="flex" alignItems="center" gap={1}>
             <Chip
               icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isConnected ? 'success.main' : 'error.main' }} />}
               label={isConnected ? 'Connected' : 'Disconnected'}
               size="small"
               variant="outlined"
             />
             
             <Tooltip title="Notifications">
               <IconButton onClick={() => setShowNotificationCenter(true)}>
                 <Badge badgeContent={unreadCount} color="error">
                   <Notifications />
                 </Badge>
               </IconButton>
             </Tooltip>
             
             <Tooltip title="Settings">
               <IconButton onClick={() => setShowSettingsPanel(true)}>
                 <Settings />
               </IconButton>
             </Tooltip>
           </Box>
         </Toolbar>
       </AppBar>

       <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
         {/* Controls Bar */}
         <Paper sx={{ p: 2, mb: 3 }}>
           <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
             <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
               <TextField
                 size="small"
                 placeholder="Search metrics..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 InputProps={{
                   startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                 }}
               />
               
               <ButtonGroup size="small">
                 <Button variant={dateRange.preset === 'today' ? 'contained' : 'outlined'}>Today</Button>
                 <Button variant={dateRange.preset === '7days' ? 'contained' : 'outlined'}>7 Days</Button>
                 <Button variant={dateRange.preset === '30days' ? 'contained' : 'outlined'}>30 Days</Button>
                 <Button variant="outlined" startIcon={<DateRangeIcon />}>Custom</Button>
               </ButtonGroup>
             </Box>
             
             <ButtonGroup>
               <Button startIcon={<Download />} onClick={handleExportData}>
                 Export
               </Button>
               <Button startIcon={<Refresh />} onClick={handleRefresh}>
                 Refresh
               </Button>
             </ButtonGroup>
           </Box>
         </Paper>

         {/* Metrics Cards */}
         <Grid container spacing={3} sx={{ mb: 3 }}>
           {filteredMetrics.map((metric) => (
             <GridItem xs={12} sm={6} md={3} key={metric.id}>
               <MetricCard metric={metric} />
             </GridItem>
           ))}
         </Grid>

         {/* Main Content Tabs */}
         <Paper sx={{ mb: 3 }}>
           <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
             <Tab label="Overview" />
             <Tab label="Analytics" />
             <Tab label="Insights" />
             <Tab label="Real-time" />
           </Tabs>

           <TabPanel value={currentTab} index={0}>
             {/* Charts Grid */}
             <Grid container spacing={3}>
               <GridItem xs={12} lg={8}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>Trend Analysis</Typography>
                     <Box sx={{ height: 400 }}>
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={timeSeriesData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="date" />
                           <YAxis />
                           <RechartsTooltip />
                           <Legend />
                           <Area type="monotone" dataKey="visitors" stackId="1" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
                           <Area type="monotone" dataKey="conversions" stackId="2" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.6} />
                         </AreaChart>
                       </ResponsiveContainer>
                     </Box>
                   </CardContent>
                 </Card>
               </GridItem>
               
               <GridItem xs={12} lg={4}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>Device Distribution</Typography>
                     <Box sx={{ height: 400 }}>
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie
                             data={pieData}
                             cx="50%"
                             cy="50%"
                             labelLine={false}
                             label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                             outerRadius={80}
                             fill="#8884d8"
                             dataKey="value"
                           >
                             {pieData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                           </Pie>
                           <RechartsTooltip />
                         </PieChart>
                       </ResponsiveContainer>
                     </Box>
                   </CardContent>
                 </Card>
               </GridItem>
             </Grid>
           </TabPanel>

           <TabPanel value={currentTab} index={1}>
             {/* Advanced Analytics */}
             {advancedAnalytics && (
               <Grid container spacing={3}>
                 <GridItem xs={12} md={4}>
                   <Card>
                     <CardContent>
                       <Typography variant="h6" gutterBottom>Predictions</Typography>
                       {advancedAnalytics.predictions.map((prediction: any, index: number) => (
                         <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                           <Box display="flex" justifyContent="space-between" alignItems="center">
                             <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                               {prediction.metric}
                             </Typography>
                             <Typography variant="h6" fontWeight="bold">
                               {prediction.predictedValue.toLocaleString()}
                             </Typography>
                           </Box>
                           <LinearProgress 
                             variant="determinate" 
                             value={prediction.confidence * 100} 
                             sx={{ mt: 1 }}
                           />
                           <Typography variant="caption" color="text.secondary">
                             Confidence: {Math.round(prediction.confidence * 100)}%
                           </Typography>
                         </Box>
                       ))}
                     </CardContent>
                   </Card>
                 </GridItem>

                 <GridItem xs={12} md={8}>
                   <Card>
                     <CardContent>
                       <Typography variant="h6" gutterBottom>Key Insights</Typography>
                       {advancedAnalytics.insights.map((insight: any) => (
                         <Accordion key={insight.id}>
                           <AccordionSummary expandIcon={<ExpandMore />}>
                             <Box display="flex" alignItems="center" width="100%">
                               <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                 {insight.title}
                               </Typography>
                               <Chip 
                                 label={insight.impact} 
                                 size="small"
                                 color={insight.impact === 'high' ? 'error' : insight.impact === 'medium' ? 'warning' : 'success'}
                               />
                             </Box>
                           </AccordionSummary>
                           <AccordionDetails>
                             <Typography variant="body2" color="text.secondary">
                               {insight.description}
                             </Typography>
                           </AccordionDetails>
                         </Accordion>
                       ))}
                     </CardContent>
                   </Card>
                 </GridItem>
               </Grid>
             )}
           </TabPanel>

           <TabPanel value={currentTab} index={2}>
             <Grid container spacing={3}>
               <GridItem xs={12}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>Performance Insights</Typography>
                     <Grid container spacing={3}>
                       <GridItem xs={12} sm={6} md={3}>
                         <Box textAlign="center" p={2}>
                           <Typography variant="h4" color="success.main" fontWeight="bold">99.9%</Typography>
                           <Typography variant="body2" color="text.secondary">Uptime</Typography>
                         </Box>
                       </GridItem>
                       <GridItem xs={12} sm={6} md={3}>
                         <Box textAlign="center" p={2}>
                           <Typography variant="h4" color="success.main" fontWeight="bold">1.2s</Typography>
                           <Typography variant="body2" color="text.secondary">Avg Load Time</Typography>
                         </Box>
                       </GridItem>
                       <GridItem xs={12} sm={6} md={3}>
                         <Box textAlign="center" p={2}>
                           <Typography variant="h4" color="primary.main" fontWeight="bold">95</Typography>
                           <Typography variant="body2" color="text.secondary">Performance Score</Typography>
                         </Box>
                       </GridItem>
                       <GridItem xs={12} sm={6} md={3}>
                         <Box textAlign="center" p={2}>
                           <Typography variant="h4" color="warning.main" fontWeight="bold">2</Typography>
                           <Typography variant="body2" color="text.secondary">Active Issues</Typography>
                         </Box>
                       </GridItem>
                     </Grid>
                   </CardContent>
                 </Card>
               </GridItem>
             </Grid>
           </TabPanel>

           <TabPanel value={currentTab} index={3}>
             <Grid container spacing={3}>
               <GridItem xs={12} md={6}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>Real-time Activity</Typography>
                     <List>
                       <ListItem>
                         <ListItemText 
                           primary="New user from USA" 
                           secondary="2 minutes ago"
                         />
                       </ListItem>
                       <ListItem>
                         <ListItemText 
                           primary="Purchase completed" 
                           secondary="5 minutes ago"
                         />
                       </ListItem>
                       <ListItem>
                         <ListItemText 
                           primary="Page view: /products" 
                           secondary="7 minutes ago"
                         />
                       </ListItem>
                     </List>
                   </CardContent>
                 </Card>
               </GridItem>
               
               <GridItem xs={12} md={6}>
                 <Card>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>Top Pages</Typography>
                     <List>
                       {[
                         { page: '/dashboard', views: 1234 },
                         { page: '/products', views: 987 },
                         { page: '/about', views: 654 }
                       ].map((item, index) => (
                         <ListItem key={index}>
                           <ListItemText 
                             primary={item.page}
                             secondary={`${item.views} views`}
                           />
                         </ListItem>
                       ))}
                     </List>
                   </CardContent>
                 </Card>
               </GridItem>
             </Grid>
           </TabPanel>
         </Paper>
       </Container>

       {/* Modals and Drawers */}
       <ExportModal />
       <SettingsModal />
       <NotificationDrawer />

       {/* Snackbar for notifications */}
       <Snackbar
         open={snackbarOpen}
         autoHideDuration={6000}
         onClose={() => setSnackbarOpen(false)}
       >
         <Alert 
           onClose={() => setSnackbarOpen(false)} 
           severity={snackbarSeverity}
           sx={{ width: '100%' }}
         >
           {snackbarMessage}
         </Alert>
       </Snackbar>
     </Box>
   </LocalizationProvider>
 );
};