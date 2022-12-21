// import React from "react";

// const Dashboard = (props ) => {
//   return (
//     <div>dashboard</div>
//   );
// };
// export default Dashboard;

import {
  Box,
  Card,
  CardActions,
  Button,
  CardContent,
  Container,
  Typography,
  CardMedia,
  Stack,
} from "@mui/material";
import user from "../../static/images/user.webp";
import food from "../../static/images/food.png";
import menu_food from "../../static/images/menu_food.png";
import menu from "../../static/images/menu.png";
import record from "../../static/images/record.png";
import user_food from "../../static/images/user_food.png";

import { useRedirect } from "react-admin";

export default function Dashboard() {
  const redirect = useRedirect();
  return (
    <Box display="flex" minHeight="100vh">
      <Container maxWidth="xl">
        <Typography
          display="flex"
          justifyContent="center"
          alignItems="center"
          variant="h4"
          sx={{ mb: 5, mt: 5 }}
        >
          Hi, Welcome back
        </Typography>
        <Stack direction="column" justifyContent="center">
          <Stack direction="row" justifyContent="center">
            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia component="img" height="120" image={user} alt="user" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here you can view all types of users, users, delete them,
                  change their role, add new administrators, edit data.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/account");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia component="img" height="120" image={food} alt="food" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Food
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here you can view all types of food, filter food, delete it,
                  change data about it, add new food based on existing food
                  types, edit data.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/food");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia
                component="img"
                height="120"
                image={user_food}
                alt="user"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="account_food">
                  Account Food
                </Typography>
                <Typography sx={{  mt: 1}} variant="body2" color="text.secondary">
                  Here you can view all possible data of this table, view their
                  fields, and remove items from the database and associated with
                  them.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/account-food");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Stack>
          <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia component="img" height="120" image={menu} alt="menu" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Menu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here you can view all possible data of this table, view their
                  fields and remove them from the database.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/menu");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia
                component="img"
                height="120"
                image={record}
                alt="record"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Record
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here you can view all possible data of this table, view their
                  fields and remove them from the database.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/record");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, mr: 5, p: 5 }}>
              <CardMedia
                component="img"
                height="120"
                image={menu_food}
                alt="food_menu"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Food Menu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here you can view all possible data of this table, view their
                  fields and remove them from the database.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    redirect("/food-menu");
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
