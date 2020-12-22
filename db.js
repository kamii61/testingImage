const Pool =require ("pg").Pool;
const pool=new Pool({
user:"sysadmin",
password:"1",
host:"localhost",
port:5432,
database:"smarthome"


});
module.exports=pool;