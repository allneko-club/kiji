'use client';
import { getFormattedDateTimeFromObj } from '@/lib/datetime';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tag } from '@prisma/client';

type Props = {
  tags: Tag[];
}

export const TagsTable = ({ tags }: Props) => {

  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">スラッグ</TableCell>
            <TableCell align="right">画像</TableCell>
            <TableCell align="right">説明</TableCell>
            <TableCell align="right">更新日時</TableCell>
            <TableCell align="right">登録日時</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell align="right">{tag.name}</TableCell>
              <TableCell align="right">{tag.slug}</TableCell>
              <TableCell align="right">{tag.image}</TableCell>
              <TableCell align="right">{tag.description}</TableCell>
              <TableCell align="right">{getFormattedDateTimeFromObj(tag.updatedAt)}</TableCell>
              <TableCell align="right">{getFormattedDateTimeFromObj(tag.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>);
};