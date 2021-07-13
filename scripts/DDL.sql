-- ecommerce.customers definition

-- Drop table

CREATE TABLE ecommerce.customers (
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	phon_number varchar(25) NULL,
	customer_id serial NOT NULL,
	email varchar(50) NOT NULL,
	country_code varchar(10) NULL,
	city_id int4 NULL,
	CONSTRAINT customers_pk PRIMARY KEY (customer_id),
	CONSTRAINT customers_un UNIQUE (email)
);


-- ecommerce.customers foreign keys

ALTER TABLE ecommerce.customers ADD CONSTRAINT customers_fk FOREIGN KEY (country_id) REFERENCES ecommerce.country(country_id);
ALTER TABLE ecommerce.customers ADD CONSTRAINT customers_fkcity FOREIGN KEY (city_id) REFERENCES ecommerce.city(city_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- ecommerce.product definition

-- Drop table

-- DROP TABLE ecommerce.product;

CREATE TABLE ecommerce.product (
	product_id serial NOT NULL,
	product_name varchar NULL,
	unit bpchar(1) NOT NULL,
	price_per_unit int4 NOT NULL,
	description text NULL,
	product_code varchar(25) NOT NULL,
	category_id int4 NOT NULL,
	CONSTRAINT product_pk PRIMARY KEY (producti_id),
	CONSTRAINT product_un UNIQUE (product_code),
	CONSTRAINT product_fk FOREIGN KEY (category_id) REFERENCES ecommerce.category(category_id)
);
-- ecommerce.stock definition

-- Drop table

-- DROP TABLE ecommerce.stock;

CREATE TABLE ecommerce.stock (
	stock_id serial NOT NULL,
	stock_size int4 NOT NULL,
	last_updated_time timestamp NOT NULL DEFAULT now(),
	product_id int4 NULL,
	CONSTRAINT stock_pk PRIMARY KEY (stock_id),
	CONSTRAINT stock_fk FOREIGN KEY (stock_id) REFERENCES ecommerce.product(producti_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ecommerce.country definition

-- Drop table

-- DROP TABLE ecommerce.country;

CREATE TABLE ecommerce.country (
	country_id serial NOT NULL,
	country_name varchar(25) NOT NULL,
	CONSTRAINT country_pk PRIMARY KEY (country_id),
);


-- ecommerce.city definition

-- Drop table

-- DROP TABLE ecommerce.city;

CREATE TABLE ecommerce.city (
	city_id serial NOT NULL,
	city_name varchar(20) NOT NULL,
	country_id int4 NULL,
	CONSTRAINT city_pk PRIMARY KEY (city_id)
);


-- ecommerce.city foreign keys

ALTER TABLE ecommerce.city ADD CONSTRAINT city_fk FOREIGN KEY (country_id) REFERENCES ecommerce.country(country_id) ON DELETE CASCADE ON UPDATE CASCADE;


-- ecommerce.category definition

-- Drop table

-- DROP TABLE ecommerce.category;

-- ecommerce.category definition

-- Drop table

-- DROP TABLE ecommerce.category;

CREATE TABLE ecommerce.category (
	category_id serial NOT NULL,
	category_name varchar(50) NOT NULL,
	parent_category_id int4 NULL,
	CONSTRAINT category_pk PRIMARY KEY (category_id),
	CONSTRAINT category_un UNIQUE (category_name)
);

-- ecommerce.attachments_files definition

-- Drop table

-- DROP TABLE ecommerce.attachments_files;

CREATE TABLE ecommerce.attachments_files (
	file_name_timestamp varchar NOT NULL,
	id int4 NOT NULL,
	"size" float4 NOT NULL,
	mimtype varchar NOT NULL,
	imag_url text NOT NULL,
	product_id int4 NOT NULL,
	CONSTRAINT attachments_files_pk PRIMARY KEY (id)
);


-- ecommerce.attachments_files foreign keys

ALTER TABLE ecommerce.attachments_files ADD CONSTRAINT attachments_files_fk FOREIGN KEY (product_id) REFERENCES ecommerce.product(producti_id) ON DELETE CASCADE ON UPDATE CASCADE;


-- ecommerce.payment_method definition

-- Drop table

-- DROP TABLE ecommerce.payment_method;

CREATE TABLE ecommerce.payment_method (
	payment_method_id int4 NOT NULL,
	paymet_method varchar NOT NULL,
	CONSTRAINT payment_method_pk PRIMARY KEY (payment_method_id)
);


-- ecommerce.payments definition

-- Drop table

-- DROP TABLE ecommerce.payments;

CREATE TABLE ecommerce.payments (
	payment_id int4 NOT NULL,
	customer_id int4 NOT NULL,
	shipment_id int4 NOT NULL,
	payment_method_id int4 NOT NULL,
	payment_date date NOT NULL DEFAULT now(),
	amount float4 NOT NULL,
	cc_number int4 NOT NULL,
	cc_hold_name varchar NULL,
	status varchar NOT NULL,
	CONSTRAINT payments_pk PRIMARY KEY (payment_id)
);


-- ecommerce.payments foreign keys

ALTER TABLE ecommerce.payments ADD CONSTRAINT payments_fk FOREIGN KEY (customer_id) REFERENCES ecommerce.customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE ecommerce.payments ADD CONSTRAINT payments_fk_1 FOREIGN KEY (payment_method_id) REFERENCES ecommerce.payment_method(payment_method_id) ON DELETE CASCADE ON UPDATE CASCADE;


