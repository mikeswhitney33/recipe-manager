<?php 

include($file_path."/ingredient.php");

class Recipe {
    private $name;
    private $desc;
    private $yield;
    private $ingredients;
    private $steps;
    private $notes;
    private $keywords;
    private $image_name;
    private $image_path;
    private $recipe_id;

    public function __construct(
        $name, 
        $desc, 
        $yield, 
        $ingredients, 
        $steps, 
        $notes, 
        $keywords,
        $image_name,
        $image_path,
        $recipe_id=null) {

        $this->name = $name;
        $this->desc = $desc;
        $this->yield = $yield;
        $this->ingredients = $ingredients;
        $this->steps = $steps;
        $this->notes = $notes;
        $this->keywords = $keywords;
        $this->image_name = $image_name;
        $this->image_path = $image_path;
        $this->recipe_id = $recipe_id;
    }

    public static function fromRow($row) {
        $recipe_id = null;
        if(isset($row["recipe_id"])) {
            $recipe_id = $row["recipe_id"];
        }
        return new Recipe(
            $row["name"],
            $row["desc"],
            $row["yield"],
            Ingredient::fromArrayString($row["ingredients"]),
            json_decode($row["steps"]),
            $row["notes"],
            $row["keywords"],
            $row["image_name"],
            $row["image_path"],
            $recipe_id
        );
    }

    public static function toStringList($recipes) {
        $result = "[";
        for($i = 0;$i < count($recipes);$i++) {
            if($i > 0) $result.=",";
            $result.=$recipes[$i]->toString();
        }
        $result.="]";
        return $result;
    }

    public function getImageName() {
        return $this->image_name;
    }
    public function getImagePath() {
        return $this->image_path;
    }

    public function hasImage() {
        return !is_null($this->image_path) && !is_null($this->image_name);
    }

    public function toArray() {
        $arr = [
            ":name" => $this->name,
            ":desc" => $this->desc,
            ":yield" => $this->yield,
            ":notes" => $this->notes,
            ":keywords" => $this->keywords,
            ":image_name" => $this->image_name,
            ":image_path" => $this->image_path,
            ":ingredients" => $this->ingredientsToString(),
            ":steps" => $this->stepsToString()
        ];
        if(!is_null($this->recipe_id)) {
            $arr[':recipe_id'] = $this->recipe_id;
        }
        return $arr;
    }

    public function ingredientsToString() {
        $result = "[";
        for($i = 0;$i < count($this->ingredients);$i++) {
            if($i > 0) $result = $result.",";
            $result = $result.$this->ingredients[$i]->toString();
        }
        $result = $result."]";
        return $result;
    }

    public function stepsToString() {
        $result = "[";
        for($i = 0;$i < count($this->steps);$i++) {
            if($i > 0) $result = $result.",";
            $result = $result.'"'.$this->steps[$i].'"';
        }
        $result = $result."]";
        return $result;
    }

    public function toString() {
        $result = '{
            "name":"'.$this->name.'",
            "desc":"'.$this->desc.'",
            "yield":"'.$this->yield.'",
            "notes":"'.$this->notes.'",
            "keywords":"'.$this->keywords.'",
            "image_name":"'.$this->image_name.'",
            "image_path":"'.$this->image_path.'",
            "ingredients":'.$this->ingredientsToString().',
            "steps":'.$this->stepsToString();
        if(!is_null($this->recipe_id)) {
            $result .= ',
            "recipe_id":'.$this->recipe_id;
        }
        $result.='}';
        return $result;
    }
}