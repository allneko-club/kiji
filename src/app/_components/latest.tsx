'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const articleInfo = [
  {
    tag: 'エンジニア',
    title: 'ソフトウェアエンジニアリングにおけるAIの未来',
    description:
      '人工知能はソフトウェアエンジニアリングに革命をもたらしています。AIを活用したツールがどのように開発プロセスを強化し、ソフトウェアの品質を向上させるのかを探ります。',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
    ],
  },
  {
    tag: '商品',
    title: 'ユーザー中心の製品設計で成長を促進',
    description:
      'ユーザー中心の製品設計アプローチが、当社の大きな成長を牽引しています。ユーザーの心に響く製品を生み出すために私たちが採用している戦略についてご覧ください。',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
  },
  {
    tag: 'デザイン',
    title: 'モダンデザインにおけるミニマリズムの採用',
    description:
      'ミニマリズムは現代デザインの重要なトレンドです。私たちのデザインチームがミニマリズムの原則をどのように取り入れ、クリーンでインパクトのあるユーザーエクスペリエンスを創造しているかをご覧ください。',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    tag: '企業',
    title: 'イノベーションの文化を育む',
    description:
      'イノベーションは私たちの企業文化の中核です。創造性を育み、画期的なソリューションを推進するための取り組みについてご紹介します。',
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
  },
  {
    tag: 'エンジニア',
    title: '次世代ソリューションでサイバーセキュリティを進化させる',
    description:
      '当社の次世代サイバーセキュリティソリューションは、業界の新たな基準を確立しています。進化するサイバー脅威からお客様を守る当社の取り組みをご覧ください。',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    tag: '商品',
    title: 'イノベーションを通じて顧客体験を向上',
    description:
      '当社の革新的なアプローチは、顧客体験の向上に貢献しています。ユーザーの皆様にご満足いただいている新機能と改善点についてご紹介します。',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
  },
  {
    tag: 'エンジニア',
    title: '持続可能なエンジニアリングソリューションの先駆者',
    description:
      '当社の持続可能性への取り組みと、より環境に優しい未来を創造するために実践している革新的なエンジニアリングソリューションについてご紹介します。当社の環境に配慮した取り組みがもたらす効果をご覧ください。',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    tag: '商品',
    title: '最新の製品アップデートで効率を最大化',
    description:
      '最新の製品アップデートは、お客様の効率を最大限に高め、より多くの成果を達成できるよう設計されています。ワークフローを向上させる新機能と改善点の詳細な概要をご覧ください。',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
  },
  {
    tag: 'デザイン',
    title: '未来のためのデザイン：トレンドと洞察',
    description:
      '最新のデザイントレンドとインサイトを活用して、常に時代の先を行く。当社のデザインチームが、直感的で視覚的に魅力的なユーザーエクスペリエンスを創造するための専門知識を共有します。',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    tag: '企業',
    title: '当社の歩み：マイルストーンと成果',
    description:
      '当社の歩みと、その過程で達成したマイルストーンをご覧ください。小さな会社から業界のリーダーへと成長し、成功へと至った当社のストーリーをご覧ください。',
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
  },
];

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {articleInfo.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>

              <Author authors={article.authors} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
      </Box>
    </div>
  );
}
