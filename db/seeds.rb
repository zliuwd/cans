# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
construct = Construct.create(name: 'Default')
Domain.create(title: 'CHILD BEHAVIORAL/EMOTIONAL NEEDS', construct_id: construct.id)
Domain.create(title: 'LIFE DOMAIN FUNCTIONING', construct_id: construct.id)
Domain.create(title: 'RISK BEHAVIORS', construct_id: construct.id)
Domain.create(title: 'CULTURAL FACTORS', construct_id: construct.id)
Domain.create(title: 'STRENGTHS DOMAIN', construct_id: construct.id)
Domain.create(title: 'CAREGIVER RESOURCES & NEEDS', construct_id: construct.id)
Domain.create(title: 'TRAUMA', construct_id: construct.id)
