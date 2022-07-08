import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Chip, Box, Tabs, IconButton, Typography, Avatar, Card, CardContent } from '@mui/material';
import styled from '@emotion/styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';

import { useNavigate } from 'react-router-dom';

const StyledChip = styled(Chip)`
  border-radius: 16px;
  text-transform: capitalize;
  color: ${(props) => (props.selected ? '#FFFFFF' : '#6877AE')};
  background-color: ${(props) => (props.selected ? '#03194F' : '#FFFFFF')};
  border: 4px solid ${'#03194F'};
  border-color: ${(props) => (props.selected ? '#03194F' : 'rgba(0, 83, 229, 0.12)')};

  .MuiChip-root&:hover {
    background-color: ${(props) => (props.selected ? '#03194F' : '')};
  }
`;

const StyledIconButton = styled(IconButton)`
  left: ${(props) => (props.isLeft ? '0' : 'none')};
  right: ${(props) => (props.isLeft ? 'none' : '0')};

  height: 32px;
  width: 32px;
  position: absolute;
  border-radius: 16px;
  border: 1px solid gray;
  //top: 33%;
  background-color: white;
  color: rgba(0, 83, 229, 1);
  border-color: rgba(0, 83, 229, 0.12);

  z-index: 1;
  opacity: 1;
  margin: 20px;

  :hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12);
    border-color: white;
    background-color: inherit;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: 'auto',
    maxWidth: '100%',
  },
  chip: {
    margin: theme.spacing(2),
  },
}));

export default function LocationsSearch({ locations }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue' },
    { key: 5, label: 'Knockout' },
    { key: 6, label: 'Ember' },
    { key: 7, label: 'D3' },
    { key: 8, label: 'Google Charts' },
    { key: 9, label: 'C+' },
    { key: 10, label: 'C++' },
    { key: 11, label: 'NodeJS' },
  ]);

  const [selectedIndustryFilter, setSelectedIndustryFilter] = React.useState('Angular');

  return (
    <Box className={classes.root}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={0}
        aria-label="scrollable auto tabs example"
        ScrollButtonComponent={(props) => {
          if (props.direction === 'left') {
            return (
              <StyledIconButton isLeft {...props}>
                <ChevronLeftIcon />
              </StyledIconButton>
            );
          }
          if (props.direction === 'right') {
            return (
              <StyledIconButton {...props}>
                <ChevronRightIcon />
              </StyledIconButton>
            );
          }
        }}
      >
        {chipData.map((data) => (
          <StyledChip
            label={data.label}
            onClick={() => {
              setSelectedIndustryFilter(data.label);
              console.log(data.label);
            }}
            selected={data.label === selectedIndustryFilter}
            key={data.key}
            className={classes.chip}
          />
        ))}
        {/* {locations.map((location, index) => (
          <Card
            sx={{ maxWidth: 500, backgroundColor: '#f2f2f2', cursor: 'pointer' }}
            onClick={() => navigate(`/dashboard/location/${location._id}`)}
            key={index}
          >
            <img width="100%" height="200" src={location.photo} alt={location.name} style={{ zIndex: -100 }} />
            <CardContent
              sx={{
                backgroundColor: '#f2f2f2',
                zIndex: 0,
              }}
            >
              <Card
                sx={{
                  mt: -7,
                  maxWidth: '100%',
                  borderRadius: 0.5,
                  py: 2,
                  px: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={location.addedBy.photo}
                  alt={location.addedBy.name}
                  sx={{
                    width: 90,
                    height: 90,
                    mt: 0,
                    border: 2.5,
                    borderColor: '#0043ca',
                    zIndex: 1,
                  }}
                />
                <Typography sx={{ my: 2, textTransform: 'capitalize' }} variant="caption" component="div">
                  <b>Added By: {location.addedBy.name}</b>
                </Typography>
                <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                  {location.name}
                </Typography>
                <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                  {location.district}
                  {', '}
                </Typography>
                <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                  {location.state}
                </Typography>
                <Typography sx={{ mb: 2, textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                  {'PinCode: '}
                  {location.pincode}
                </Typography>
              </Card>
            </CardContent>
          </Card>
        ))} */}
      </Tabs>
    </Box>
  );
}
