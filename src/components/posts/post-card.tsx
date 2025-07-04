'use client';

import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import { paths } from '@/lib/paths';
import { PostWithCategoryAuthor } from '@/types/post';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { convert } from 'html-to-text';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ author, created }: { author: { name: string; avatar: string }; created: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          <Avatar alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
        </AvatarGroup>
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{created}</Typography>
    </Box>
  );
}

export function PostCard({ post }: { post: PostWithCategoryAuthor }) {
  const router = useRouter();
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<string | null>(null);
  const handleFocus = (index: string) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <StyledCard
        variant="outlined"
        onFocus={() => handleFocus(post.id)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === post.id ? 'Mui-focused' : ''}
        onClick={() => router.push(paths.posts.detail.getHref(post.slug))}>
        <CardMedia
          component="img"
          alt="green iguana"
          image="https://picsum.photos/800/450?random=1"
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <StyledCardContent>
          {post.category && (
            <Typography gutterBottom variant="caption" component="div">
              {post.category.name}
            </Typography>
          )}
          <Typography gutterBottom variant="h6" component="div">
            {post.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {convert(post.content)}
          </StyledTypography>
        </StyledCardContent>
        <Author
          author={{ name: post.author.name, avatar: post.author.image }}
          created={getFormattedDateTimeFromObj(post.createdAt)}
        />
      </StyledCard>
    </Grid>
  );
}
