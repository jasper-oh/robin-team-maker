import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Paper,
  withStyles
} from '@material-ui/core';

import TeamSizes from './TeamSizes';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: '#11999e',
    color: theme.palette.text.secondary
  },
  margin: {
    margin: theme.spacing.unit
  },
  link: {
    textDecoration: 'none',

    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: 'black'
    }
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
});

const TeamSizePicker = ({ groups, selectedGroupId, teamCount, maxSize, classes, handleChange }) => {
  const selectedGroup = groups.filter(group => group.id === selectedGroupId);
  const members = selectedGroup.length !== 0 && selectedGroup[0].members;
  const countMembers = selectedGroup.length !== 0 && selectedGroup[0].members.length;
  const teamSizing = countMembers > 0 && Array.from(Array(countMembers), (_, index) => index + 1);
  const maxSizeSizing = countMembers > 0 && Array.from(Array(countMembers), (_, index) => index + 1);

  return (
    countMembers > 2 && (
      <Paper className={classes.paper}>
        <Typography component="h5" variant="h5" gutterBottom>
          Team Generator
        </Typography>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="sizeSelector">No. of teams</InputLabel>
          <Select value={teamCount} onChange={handleChange} inputProps={{ name: 'teamCount', id: 'sizeSelector' }}>
            {countMembers > 0 &&
              teamSizing.map(
                teamCount =>
                  teamCount > 1 &&
                  teamCount < countMembers && (
                    <MenuItem key={teamCount} value={teamCount}>
                      {teamCount}
                      {countMembers % teamCount === 0 && ` *`}
                    </MenuItem>
                  )
              )}
          </Select>
          <FormHelperText>* = equal teams</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="maxSizeSelector">Max Size</InputLabel>
          <Select value={maxSize} onChange={handleChange} inputProps={{ name: 'maxSize', id: 'maxSizeSelector' }}>
            {countMembers > 0 &&
              maxSizeSizing.map(
                maxSize =>
                  maxSize > 1 &&
                  maxSize <= Math.ceil(countMembers / 2) && (
                    <MenuItem key={maxSize} value={maxSize}>
                      {maxSize}
                      {countMembers % maxSize === 0 && ` *`}
                    </MenuItem>
                  )
              )}
          </Select>
          <FormHelperText />
        </FormControl>
        {(teamCount !== 0 || maxSize !== 0) && <TeamSizes teamCount={teamCount} members={members} maxSize={maxSize} />}
      </Paper>
    )
  );
};

TeamSizePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  teamCount: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  classes: PropTypes.shape({}.isRequired).isRequired,
  selectedGroupId: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamSizePicker);
