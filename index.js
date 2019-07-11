var readlineSync=require('readline-sync');
var fs =require('fs');
var lessons=[];

function showMenu(){
	console.log("\n1.Danh sách bài đã học");
	console.log("2.Tạo bài mới học");
 	console.log("3.Xóa bài học");
 	console.log("4.Save & Exit");
 	var options = readlineSync.question('>');
 	switch (options) {
 		case "1":
 			if(lessons=="") {

 				console.log("\nBạn chưa có bài học nào");
 				Comeback()
 			}
 			else{
 			showMenu1();
 			Comeback();
 			}
 			break;
 		case "2":
 			showMenu2();
 			showMenu();
 			break;
 		case "3":
 			showMenu1();
 			Delete();
 			showMenu();
 			break;
 		case "4":
 			showMenu3();
 			break;
 		default:
 			console.log("Wrong Options");
 			break;
 	}
}
function showMenu1(){
	for (var lesson of lessons)
	console.log(lesson.name,lesson.status);
}
function showMenu2(){
	var name=readlineSync.question('Your lesson :');
	var status=readlineSync.question('Status :');
	var lesson ={
		name: name,
		status:status
	};
	lessons.push(lesson);
	showMenu3();
}
function showMenu3(){
	var content = JSON.stringify(lessons);
	fs.writeFileSync('./data.json',content,{ encoding : 'utf8'});
	console.log("Hệ thống đã lưu trữ thành công");
}
function loadData(){
	var fileContent= fs.readFileSync('./data.json');
	lessons=JSON.parse(fileContent);
}
function Comeback(){	
	var x=readlineSync.question(
'\nBack Menu (Y/N/YS)\n\
1.Yes! \n\
2.Yes,save! \n\
3.No,out! \n\
The number you choose.....');
		if (x=="1"){
	 		showMenu();
	 	}else if(x=="2"){
	 		showMenu3();
	 		showMenu();
	 	}else {
	 		console.log("Bạn đã rời khỏi chương trình");
	 	}
}
 function Delete(){
 	var del=readlineSync.question('Delete the status :');
 	var index=lessons.findIndex(x=>x.name==del);
 	lessons.splice(index,1);
 	showMenu3();
}


function main(){
	loadData();
	showMenu();
}
main();