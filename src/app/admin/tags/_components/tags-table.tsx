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
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { paths } from '@/config/paths';
import NextLink from 'next/link';
import CreateIcon from '@mui/icons-material/Create';
import { DeleteTag } from '@/app/admin/tags/_components/delete-tag';

type Props = {
  tags: Tag[];
}

export const TagsTable = ({ tags }: Props) => {

  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">操作</TableCell>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">スラッグ</TableCell>
            <TableCell align="right">説明</TableCell>
            <TableCell align="right">更新日時</TableCell>
            <TableCell align="right">登録日時</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                <Stack spacing={1} direction="row" sx={{ justifyContent: "flex-end" }}>
                  <IconButton href={paths.admin.tags.update.getHref(tag.id)} component={NextLink}>
                    <CreateIcon />
                  </IconButton>
                  <DeleteTag id={tag.id} />
                </Stack>
              </TableCell>
              <TableCell align="right">{tag.name}</TableCell>
              <TableCell align="right">{tag.slug}</TableCell>
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