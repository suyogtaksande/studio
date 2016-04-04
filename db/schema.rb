# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160401154327) do

  create_table "blogs", force: :cascade do |t|
    t.string   "title",                   limit: 255
    t.string   "body",                    limit: 255
    t.string   "author",                  limit: 255
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "blog_image_file_name",    limit: 255
    t.string   "blog_image_content_type", limit: 255
    t.integer  "blog_image_file_size",    limit: 4
    t.datetime "blog_image_updated_at"
  end

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",    limit: 255, null: false
    t.string   "data_content_type", limit: 255
    t.integer  "data_file_size",    limit: 4
    t.integer  "assetable_id",      limit: 4
    t.string   "assetable_type",    limit: 30
    t.string   "type",              limit: 30
    t.integer  "width",             limit: 4
    t.integer  "height",            limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ckeditor_assets", ["assetable_type", "assetable_id"], name: "idx_ckeditor_assetable", using: :btree
  add_index "ckeditor_assets", ["assetable_type", "type", "assetable_id"], name: "idx_ckeditor_assetable_type", using: :btree

  create_table "comments", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "email",      limit: 255
    t.string   "site",       limit: 255
    t.string   "message",    limit: 255
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "blog_id",    limit: 4
    t.boolean  "approve",                default: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "email",      limit: 255
    t.string   "message",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "portfolios", force: :cascade do |t|
    t.string   "title",                        limit: 255
    t.string   "description",                  limit: 255
    t.string   "url",                          limit: 255
    t.string   "image",                        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "portfolio_image_file_name",    limit: 255
    t.string   "portfolio_image_content_type", limit: 255
    t.integer  "portfolio_image_file_size",    limit: 4
    t.datetime "portfolio_image_updated_at"
    t.string   "image_file_name",              limit: 255
    t.string   "image_content_type",           limit: 255
    t.integer  "image_file_size",              limit: 4
    t.datetime "image_updated_at"
  end

  create_table "user_sessions", force: :cascade do |t|
    t.string   "session_id", limit: 255,   null: false
    t.text     "data",       limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_sessions", ["session_id"], name: "index_user_sessions_on_session_id", using: :btree
  add_index "user_sessions", ["updated_at"], name: "index_user_sessions_on_updated_at", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                limit: 255, default: "", null: false
    t.string   "crypted_password",    limit: 255,              null: false
    t.string   "password_salt",       limit: 255,              null: false
    t.string   "email",               limit: 255,              null: false
    t.string   "persistence_token",   limit: 255,              null: false
    t.string   "single_access_token", limit: 255,              null: false
    t.string   "perishable_token",    limit: 255,              null: false
    t.integer  "login_count",         limit: 4,   default: 0,  null: false
    t.integer  "failed_login_count",  limit: 4,   default: 0,  null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip",    limit: 255
    t.string   "last_login_ip",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
