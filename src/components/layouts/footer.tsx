import { paths } from '@/lib/paths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © Kiji '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}>
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                ニュースレターを購読する
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                毎週の最新情報を購読してください。スパムメールは一切ありません。
              </Typography>
              <InputLabel htmlFor="email-newsletter">メールアドレス</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  fullWidth
                  aria-label="メールアドレスを入力して下さい。"
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': 'メールアドレスを入力して下さい。',
                    },
                  }}
                  sx={{ width: '250px' }}
                />
                <Button variant="contained" color="primary" size="small" sx={{ flexShrink: 0 }}>
                  購読する
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href={paths.contact.getHref()}>
              Contact
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href={paths.about.getHref()}>
              About us
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Others
            </Typography>
            <Link color="text.secondary" variant="body2" href={paths.categories.getHref()}>
              Categories
            </Link>
            <Link color="text.secondary" variant="body2" href={paths.tags.getHref()}>
              Tags
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: { xs: 2, sm: 4 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
