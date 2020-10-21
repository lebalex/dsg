<?php
class Categ_Model {
    private $_id;
    private $_name;
    private $_img;

    public function __construct($id, $name, $img){
        $this->_id=$id;
        $this->_name=$name;
        $this->_img=$img;
    }
   
   
    function getId() {
        return $this->_id;
    }
    function getName() {
        return $this->_name;
    }
    function getImg() {
        return $this->_img;
    }
}