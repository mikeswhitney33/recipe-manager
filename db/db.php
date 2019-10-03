<?php 
$file_path = realpath(dirname(__FILE__));

include($file_path."/recipe.php");


class DB {
    private $pdo;
    
    public function connect(){
        try {
            $this->pdo = new \PDO("sqlite:" . realpath(dirname(__FILE__)) . "/recipes.db");
            $this->createTables();
        }
        catch (\PDOException $e){
            return false;
        }
        return true;
    }

    function createTables() {
        $commands = [
            "CREATE TABLE IF NOT EXISTS recipes(
                recipe_id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                desc TEXT,
                yield TEXT,
                notes TEXT,
                ingredients TEXT,
                steps TEXT,
                keywords TEXT,
                image_name TEXT,
                image_path TEXt)"
        ];
        foreach($commands as $command){
            $this->pdo->exec($command);
        }
    }

    function insertRecipe($recipe) {
        $sql = 'INSERT INTO recipes(
            name, 
            desc, 
            yield, 
            notes, 
            ingredients, 
            steps, 
            keywords, 
            image_name, 
            image_path) 
            VALUES(
                :name, 
                :desc, 
                :yield, 
                :notes, 
                :ingredients, 
                :steps, 
                :keywords, 
                :image_name, 
                :image_path)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($recipe->toArray());
        return $this->pdo->lastInsertId();
    }
    // function insertRecipe($name, $desc, $yield, $notes, $ingredients, $steps, $keywords, $image_name, $image_path){
    //     $sql = 'INSERT INTO recipes(name, desc, yield, notes, ingredients, steps, keywords, image_name, image_path) 
    //         VALUES(:name, :desc, :yield, :notes, :ingredients, :steps, :keywords, :image_name, :image_path)';
    //     $stmt = $this->pdo->prepare($sql);
    //     $stmt->execute([
    //         ':name' => $name,
    //         ':desc' => $desc,
    //         ':yield' => $yield,
    //         ':ingredients' => $ingredients,
    //         ':notes' => $notes,
    //         ':steps' =>$steps,
    //         ':keywords' => $keywords,
    //         ':image_name' => $image_name,
    //         ':image_path' => $image_path
    //     ]);
    //     return $this->pdo->lastInsertId();
    // }

    function updateRecipe($recipe_id, $recipe) {
        $sql = 'UPDATE recipes SET 
            name = :name, 
            desc = :desc, 
            yield = :yield, 
            notes = :notes, 
            ingredients = :ingredients, 
            steps = :steps, 
            keywords = :keywords ,
            image_name = :image_name,
            image_path = :image_path
            WHERE recipe_id = :recipe_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($recipe->toArray($recipe_id));
    }
    // function updateRecipe($recipe_id, $name, $desc, $yield, $notes, $ingredients, $steps, $keywords, $image_name, $image_path){
    //     $sql = 'UPDATE recipes SET 
    //         name = :name, 
    //         desc = :desc, 
    //         yield = :yield, 
    //         notes = :notes, 
    //         ingredients = :ingredients, 
    //         steps = :steps, 
    //         keywords = :keywords ,
    //         image_name = :image_name,
    //         image_path = :image_path
    //         WHERE recipe_id = :recipe_id';

    //     $stmt = $this->pdo->prepare($sql);
    //     $stmt->execute([
    //         ':recipe_id' =>$recipe_id,
    //         ':name' => $name,
    //         ':desc' => $desc,
    //         ':yield' => $yield,
    //         ':ingredients' => $ingredients,
    //         ':steps' =>$steps,
    //         ':notes' => $notes,
    //         ':keywords' => $keywords,
    //         ':image_name' => $image_name,
    //         ':image_path' => $image_path
    //     ]);
    // }

    function deleteRecipe($recipe_id) {
        $sql = 'DELETE FROM recipes WHERE recipe_id = :recipe_id';
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ":recipe_id" => $recipe_id
        ]);
    }

    function getRecipe($recipe_id) {
        $sql = 'SELECT * FROM recipes WHERE recipe_id = :recipe_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt -> execute([':recipe_id' => $recipe_id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        $recipe = Recipe::fromRow($row);
        return $recipe;
    }

    function getRecipes() {
        $sql = 'SELECT * FROM recipes';
        $stmt = $this->pdo->prepare($sql);
        $stmt -> execute();
        $recipes = [];
        while($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $recipes[] = Recipe::fromRow($row);
        }
        return $recipes;
    }
}


?>