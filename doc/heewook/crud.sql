-- 게시물 데이터 입력 
insert into x_board(board_id, title, contents)
values(1, '제목1', '내용');

insert into x_board(board_id, title, contents)
values(2, '제목2', '내용');

insert into x_board(board_id, title, contents)
values(3, '제목3', '내용');

insert into x_board(board_id, title, contents)
values(4, '제목4', '내용');

insert into x_board(board_id, title, contents)
values(5, '제목5', '내용');

insert into x_board(board_id, title, contents)
values(6, '제목6', '내용');

-- 게시물 첨부파일 데이터 입력
insert into x_board_file(board_file_id, file_path, board_id) 
values(101, 'a1.gif', 1);
insert into x_board_file(board_file_id, file_path, board_id) 
values(102, 'a2.gif', 1);
insert into x_board_file(board_file_id, file_path, board_id) 
values(103, 'a3.gif', 1);

insert into x_board_file(board_file_id, file_path, board_id) 
values(104, 'b1.gif', 2);
insert into x_board_file(board_file_id, file_path, board_id) 
values(105, 'b2.gif', 2);


insert into x_board_file(board_file_id, file_path, board_id) 
values(106, 'c1.gif', 3);
insert into x_board_file(board_file_id, file_path, board_id) 
values(107, 'c2.gif', 3);
insert into x_board_file(board_file_id, file_path, board_id) 
values(108, 'c3.gif', 3);

insert into x_board_file(board_file_id, file_path, board_id) 
values(109, 'd1.gif', 4);

insert into x_board_file(board_file_id, file_path, board_id) 
values(110, 'e1.gif', 5);

-- 데이터 조회 
select
  board_id,
  title,
  created_date
from 
  x_board
order by board_id desc;

select
  board_id,
  title,
  contents,
  created_date,
  view_count
from 
  x_board
where 
  board_id = 3;

-- 데이터 변경
update x_board set
  view_count = view_count + 1,
  created_date = now()
where
  board_id = 3;

-- 데이터 삭제
delete from x_board
where
  board_id = 3;

-- 게시물 데이터와 첨부파일 데이터를 함께 조회하기
select
  b.board_id,
  b.title,
  b.contents,
  b.created_date,
  b.view_count,
  f.board_file_id,
  f.file_path
from x_board b
  left outer join x_board_file f on b.board_id = f.board_id
where
  b.board_id = 1;






