// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Avatar, Card, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// utils
import { fShortenNumber } from '../utils/formatNumber';

// components


// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  width: theme.spacing(10),
  height: theme.spacing(10),
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2.5),
}));

// ----------------------------------------------------------------------

TrafficLocationsUI.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function TrafficLocationsUI({ title,subtitle1,subtitle2, bgcolor,total,id, icon, color = 'primary', sx, ...other }) {
   const navigate= useNavigate();
  return (
    <Paper
    variant="outlined"
    onClick={()=>navigate(`/dashboard/location/${id}`)}
      sx={{
        width:"100%",
        cursor:"pointer",
        p:1.5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
      
       <Avatar alt="Remy Sharp" src={icon}  sx={{ width: "100%", height: "100%" }}/>
      </IconWrapperStyle>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.72, textTransform:"capitalize"}}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{opacity:0.7, textTransform:"capitalize"}}>{subtitle1} </Typography>
      <Typography variant="subtitle2" sx={{opacity:0.6, textTransform:"capitalize"}}>{subtitle2} </Typography>
    
      
    </Paper>
  );
}
