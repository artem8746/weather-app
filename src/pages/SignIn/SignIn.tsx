import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../firebase/firebaseinit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, inMemoryPersistence, setPersistence, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

interface Props {
  isSignUp?: boolean
}

export const SignIn: React.FC<Props> = ({ isSignUp }) => {
  const navigate = useNavigate();
  const rememberMeRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      if (rememberMeRef.current!.value) {
        await setPersistence(firebaseAuth, inMemoryPersistence);
      }

      await signInWithEmailAndPassword(firebaseAuth, email, password);

      navigate("/");
    } catch (ex) {
      // handle exeption
    }
  };

  const handleSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      if (rememberMeRef.current!.value) {
        await setPersistence(firebaseAuth, inMemoryPersistence);
      }

      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      navigate("/");
    } catch (ex) {
      // handle exeption
    }
  };

  const handleAnonymusSignIn = async () => {
    if (rememberMeRef.current!.value) {
      await setPersistence(firebaseAuth, inMemoryPersistence);
    }

    await signInAnonymously(firebaseAuth);

    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    try {
      if (rememberMeRef.current!.value) {
        await setPersistence(firebaseAuth, inMemoryPersistence);
      }

      const provider = new GoogleAuthProvider();

      await signInWithPopup(firebaseAuth, provider);

      navigate("/");
    } catch (ex) {
      // handle exeption
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={isSignUp ? handleSubmitSignUp : handleSubmitSignIn}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmedPassword"
                label="Confirm password"
                type="password"
                id="confirmedPassword"
                autoComplete="current-password"
              />
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  name="remember"
                  ref={rememberMeRef}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mb: 1 }}
              onClick={handleAnonymusSignIn}
            >
              Sign In Anonymously
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
