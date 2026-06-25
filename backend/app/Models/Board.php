<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Board extends Model {
    protected $fillable = ['name', 'description'];
    public function lists() { return $this->hasMany(BoardList::class); }
    public function members() { return $this->hasMany(Member::class); }
    public function tags() { return $this->hasMany(Tag::class); }
}
