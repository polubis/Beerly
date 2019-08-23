import React from 'react';

import usersService from 'services/users.service';
import { UserWithFavouriteBeers } from 'models/user';

type UserTilesFacadeProps = {
  children: (state: UserTilesFacadeState, handleGetUsers: () => void) => JSX.Element;
};

type UserTilesFacadeState = {
  isLoading: boolean;
  users: UserWithFavouriteBeers[];
};

class UserTilesFacade extends React.Component<UserTilesFacadeProps, UserTilesFacadeState> {
  state = {
    isLoading: true,
    users: []
  };

  componentDidMount() {
    this.handleGetUsers();
  }

  handleGetUsers = (): void => {
    this.setState({ isLoading: true, users: [] });

    usersService.getUsersWithFavouriteBeers().subscribe(
      users => {
        this.setState({ isLoading: false, users });
      },
      () => {
        this.setState({ isLoading: false, users: [] });
      }
    );
  };

  render = () => this.props.children(this.state as UserTilesFacadeState, this.handleGetUsers);
}

export default UserTilesFacade;
