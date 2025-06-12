'use client';
import * as React from 'react';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { authenticate } from '@/lib/actions';
import { paths } from '@/config/paths';
import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Card } from '@/app/auth/_components/card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

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
        action={formAction}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl required>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            fullWidth
          />
        </FormControl>
        <FormControl required>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            fullWidth
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
  );
}