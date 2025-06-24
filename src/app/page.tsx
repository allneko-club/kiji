import { Latest, MainContent } from '@/app/_components';
import * as React from 'react';

const posts = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    category: 'エンジニア',
    title: '最先端のツールでソフトウェア開発に革命を起こす',
    content:
      '当社の最新のエンジニアリングツールは、ワークフローを効率化し、生産性を向上させるように設計されています。これらのイノベーションがソフトウェア開発環境をどのように変革しているかをご覧ください。',
    authors: [
      { name: 'Remy Sharp', avatar: '/avatar-sample.png' },
      { name: 'Travis Howard', avatar: '/avatar-sample.png' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    category: '商品',
    title: '成功を導く革新的な製品機能',
    content:
      '企業の目標達成を支援する最新製品リリースの主な機能をご覧ください。ユーザーフレンドリーなインターフェースから堅牢な機能まで、当社製品が際立つ理由をご覧ください。',
    authors: [{ name: 'Erica Johns', avatar: '/avatar-sample.png' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    category: 'デザイン',
    title: '未来のためのデザイン：トレンドと洞察',
    content:
      '最新のデザイントレンドとインサイトを活用して、常に時代の先を行く。当社のデザインチームが、直感的で視覚的に魅力的なユーザーエクスペリエンスを創造するための専門知識を共有します。',
    authors: [{ name: 'Kate Morrison', avatar: '/avatar-sample.png' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    category: '企業',
    title: '当社の歩み：マイルストーンと成果',
    content:
      '当社の歩みと、その過程で達成したマイルストーンをご覧ください。小さな会社から業界のリーダーへと成長し、成功へと至った当社のストーリーをご覧ください。',
    authors: [{ name: 'Cindy Baker', avatar: '' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    category: 'エンジニア',
    title: '持続可能なエンジニアリングソリューションの先駆者',
    content:
      '当社の持続可能性への取り組みと、より環境に優しい未来を創造するために実践している革新的なエンジニアリングソリューションについてご紹介します。当社の環境に配慮した取り組みがもたらす効果をご覧ください。',
    authors: [
      { name: 'Agnes Walker', avatar: '' },
      { name: 'Trevor Henderson', avatar: '/avatar-sample.png' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    category: '商品',
    title: '最新の製品アップデートで効率を最大化',
    content:
      '最新の製品アップデートは、お客様の効率を最大限に高め、より多くの成果を達成できるよう設計されています。ワークフローを向上させる新機能と改善点の詳細な概要をご覧ください。',
    authors: [{ name: 'Travis Howard', avatar: '/avatar-sample.png' }],
  },
];

export default async function Page() {
  return (
    <>
      <MainContent posts={posts} />
      <Latest posts={posts} />
    </>
  );
}
