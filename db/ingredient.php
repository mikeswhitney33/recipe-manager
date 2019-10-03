<?php

class Ingredient {
    private $name;
    private $amount;

    static function fromArrayString($str) {
        $obj = json_decode($str, true);
        $res = array();
        foreach($obj as $ing) {
            $res[] = new Ingredient($ing["name"], $ing["amount"]);
        }
        return $res;
    }

    public function __construct($name, $amount) {
        $this->name = $name;
        $this->amount = $amount;
    }

    public function toString() {
        $result = '{
            "name":"'.$this->name.'",
            "amount":"'.$this->amount.'"
        }';
        return $result;
    }
}