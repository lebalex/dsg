<?php
class User_Model {
    private $_user_id;
    private $_login;
    private $_name;
    private $_discont;
    private $_login_string;


    public function __construct($user_id, $login, $name, $discont, $login_string){
        $this->_user_id=$user_id;
        $this->_name=$name;
        $this->_login=$login;
        $this->_discont=$discont;
        $this->_login_string=$login_string;
    }
   
   
    function getUser_id() {
        return $this->_user_id;
    }
    function getName() {
        return $this->_name;
    }
    function getLogin() {
        return $this->_login;
    }
    function getDiscont() {
        return $this->_discont;
    }
    function getLogin_string() {
        return $this->_login_string;
    }
}