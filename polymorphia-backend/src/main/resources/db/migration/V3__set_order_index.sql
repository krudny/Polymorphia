update evolution_stages
set order_index=id - 1
where order_index in(select order_index from evolution_stages);

update reward
set order_index=1
where id = 2;

update reward
set order_index=2
where id = 3;

update reward
set order_index=0
where id = 101;

update reward
set order_index=1
where id = 102;
