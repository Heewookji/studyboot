
2019/05/09 

1. 문의/신고 게시판
   -(회원 샘플 데이터, 게시판 분류 테이블 먼저)문의/신고 샘플데이터
   
   -ui구현 시작

2019/05/10

1. 문의/신고게시판
  
   - 신고만, 문의만 필터링
   - 리스트에서 회원 이름에 따라 검색
   - detail , add

 
select
      s.name,
      s.intro,
      t.name,
      p.photo
    from
      sms_space s
      left outer join sms_tag t on s.space_id = t.space_id
      left outer join sms_space_photo p on s.space_id = p.space_id
    where
      s.space_id = 101;