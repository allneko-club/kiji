'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import NextLink from 'next/link'
import { authenticate } from '@/lib/actions';
import { paths } from '@/config/paths';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { Alert } from '@mui/material';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = decodeURIComponent(searchParams?.get('callbackUrl') || '/');
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        ログイン
      </Typography>
      <Typography>
        メールアドレスと、パスワードを入力してください。
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box
        component="form"
        // onSubmit={handleSubmit}
        action={formAction}
        // noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="ログインしたままにする"
        />

        {/* Auth.jsでログイン後のリダイレクト先を設定するために必要 */}
        <input id="redirectTo" name="redirectTo" hidden defaultValue={redirectTo} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          loading={isPending}
        >
          ログイン
        </Button>

        <Link
          href={paths.auth.resetPassword.getHref()}
          component={NextLink}
          type="button"
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          パスワードを忘れましたか？
        </Link>
      </Box>
      <Divider>または</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with GitHub')}
          startIcon={<GitHubIcon />}
        >
          GitHub でログイン
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          アカウントが無いですか？{' '}
          <Link
            href={paths.auth.register.getHref()}
            component={NextLink}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            登録する
          </Link>
        </Typography>
      </Box>
    </Card>
)
}