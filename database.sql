use nodejs;

create table users (
	idx int auto_increment primary key,
    userid varchar(50) unique not null,
    password varchar(200) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    url varchar(200)
);

create table posts (
	idx int auto_increment primary key,
    useridx int not null,
    createAt datetime default now(),
    text varchar(2000) not null,
    foreign key(useridx) references users(idx)
);

select * from users;
select * from posts;

select * from users where userid='apple';
insert into users (userid, password, name, email, url) values ('apple', '1111', '김사과', 'apple@apple.com', 'https://randomuser.me/api/portraits/women/32.jpg');
select * from users where idx=2;

insert into posts (useridx, text) values (2, '안녕하세요!');
select * from posts;
