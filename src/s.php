<?php



require_once "SendMailSmtpClass.php"; // подключаем класс

$mailSMTP = new SendMailSmtpClass('zhenikipatov@yandex.ru', '****', 'smtp.yandex.ru', 'Evgeniy'); // создаем экземпляр класса
// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');

// заголовок письма
$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
$headers .= "From: Evgeniy <admin@vk-book.ru>\r\n"; // от кого письмо
$result =  $mailSMTP->send('zhenikipatov@yandex.ru', 'Тема письма', 'Текст письма', $headers); // отправляем письмо
// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');
if($result === true){
    echo "Письмо успешно отправлено";
}else{
    echo "Письмо не отправлено. Ошибка: " . $result;
}

$mailSMTP = new SendMailSmtpClass('Backnv@yandex.ru', 'denado57', 'ssl://smtp.yandex.ru', 'Evgeniy', 465);

?>