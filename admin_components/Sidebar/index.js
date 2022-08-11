import { ListItem } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES } from 'Routes';
import styles from './styles';

function Sidebar(props) {

  const [menuAdminRoute, setMenuAdminRoute] = useState([]);
  useEffect(() => {
    setMenuAdminRoute(ADMIN_ROUTES);
  }, [])

  const renderList = () => {
    const { classes } = props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div">
          {menuAdminRoute?.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                exact={`${item.exact}`}
                className={({ isActive }) => `${classes.menuLink} ${isActive ? classes.menuLinkActive : ''}`}
              >
                <ListItem key={index} className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            )
          })}
        </List>
      </div>

    );
    return xhtml;
  }

  const { classes, opensidebar } = props;
  return (
    <Drawer
      open={opensidebar}
      onClose={() => this.toggleDrawer(false)}
      variant="persistent"
      anchor="left"
      classes={{
        paper: classes.wrapadmin,
      }}
    >
      {
        renderList()
      }
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  opensidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
}


export default withStyles(styles)(Sidebar);
