-- noinspection SqlNoDataSourceInspectionForFile

# MySQL scripts for dropping existing tables and recreating the database table structure
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (1, 'lesson.plans@17squadronatc.com', 'Admin', 'Account', '$2b$10$4rr97kZtpdvsqtjSIQFYkuHbOMe/UoWF.SlQkiMZ0qXE/jvvdoEGa', 'U024M3S4R9S', null, 1);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (2, 'admin@admin.com', 'Admin', 'Admin', '$2b$10$CRLPeoJCQoLC1I8AWW6Lk.zi01qPojRF46LZKVLTS0EA5Qj50pWkO', 'ABC12345', null, 1);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (3, 'normal@user.com', 'Normal', 'User', '$2b$10$vRFr6C9y45f4T5EmROaQOe7E1hJkH/Z4Uo/bKiPnRBuSMagfuX3Su', 'ABC1234539874', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (4, 'a@gmail.com', 'Amanda', 'Faria', 'abc234', 'ABC12346', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (5, 'B@gmail.com', 'Fernando', 'Brown', 'abc345', 'ABC12347', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (6, 'jeh128@mail.nz', 'Jack', 'Chen', 'abc456', 'ABC12348', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (7, 'lfg23@mail.nz', 'Ella', 'Yellow', 'abc567', 'ABC12349', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (8, 'zhe25@mail.nz', 'Henry', 'Krippner', 'abc678', 'DBC12345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (9, 'ama541@mail.nz', 'Finn', 'Veale', 'abc789', 'ADC12345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (10, '.shellstrop@hotmail.com', 'Eleanor', 'Shellstrop', 'legitsnack', 'ABD12345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (11, 'c.anagonye@stjohns.edu.au', 'Chidi', 'Anagonye', 'peepschili', 'ABC22345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (12, 'tahani.aljamil@ox.ac.uk', 'Tahani', 'Al-Jamil', 'outofthespotlight', 'ABC32345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (13, 'boooooortles@hotmail.com', 'Jason', 'Mendoza', 'boooortles', 'ABC42345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (14, 'mindystclaire@gmail.com', 'Mindy', 'St. Claire', 'password', 'ABC52345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (15, 's.garnett@stjohns.edu.au', 'Simone', 'Garnett', 'nwkvcu33krjf', 'ABC62345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (16, 'pillboi@ymail.com', 'Steven', 'Peleaz', 'jacksonville', 'ABC72345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (17, 'larryhemsworth@gmail.com', 'Larry', 'Hemsworth', 'not_thor', 'ABC82345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (18, 'johnwheaton@gmail.com', 'John', 'Wheaton', 'gossip', 'ABC92345', null, 0);
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (19, 'raven@gmail.com', 'Raven', 'Townsend', '$2b$10$HEwgBnZkW.8i8n5PBPhqXOquiBDYtddFKK2bgDZ6HidFnlzHsqYZm', 'U027ZGU52BH', null, 0); # password is password
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (20, 'swapnil@gmail.com', 'Swapnil', 'Bhagat', '$2b$10$HEwgBnZkW.8i8n5PBPhqXOquiBDYtddFKK2bgDZ6HidFnlzHsqYZm', 'U029HRS1T3J', null, 0); # ^
INSERT INTO users (id, email, first_name, last_name, password, slack_id, auth_token, is_admin) VALUES (21, 'william@gmail.com', 'William', 'Chen', '$2b$10$HEwgBnZkW.8i8n5PBPhqXOquiBDYtddFKK2bgDZ6HidFnlzHsqYZm', 'U02E1604Q8G', null, 0); # ^

INSERT INTO `lessons` (`code`, `year_level`, `lesson_number`, `title`, `time`, `scope`, `references`, `training_notes`, `when_to_teach`) VALUES
                                                                                                                                             ('AVS', 1, 1, 'Aviation History', '1 x 40min Period', 'Enabling objectives:\n Identify key moments in aviation history\n Instructional objectives:\nHot air ballooning  (Montgolfier Brothers)
Controlled flight (Wright brothers)
WWI
WWII
Civil and commercial aviation', 'NZCF 142, Ch. 1, Sec. 2
Assessor Guide 24104 (Don’t do assessment just use for helpful information)', 'Give a key event in aviation history and present it like a news story.

Place a timeline on the ground cadets must place the events along the timeline.', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 2, 'Aircraft Parts and Construction', '1 x 40min Period', 'Enabling objectives:\n Describe the six major parts of an aircraft and explain their functions

Describe key aircraft construction methods\n Instructional objectives:\nFuselage
Wings
Empennage
Undercarriage
Cockpit
Engines

Truss construction
Stressed skin construction
Materials', 'NZCF 142, Ch. 1, Sec. 2

https://www.technology.org/2019/06/24/the-basic-parts-of-an-airplane-and-their-functions/

https://www.flightliteracy.com/types-of-aircraft-construction-part-one/', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 3, 'Aircraft Identification', '1 x 40min Period', 'Enabling objectives:\n Identify common RNZAF and commercial aircraft\n Instructional objectives:\nThe WEFTUS principle
RNZAF aircraft
Commercial aircraft', 'NZCF 142, p. 24-40', '', ''),
                                                                                                                                             ('AVS', 1, 4, 'Airfield Layout/Safety', '1 x 40min Period', 'Enabling objectives:\n Describe the layout of an airfield

Describe common airfield markings\n Instructional objectives:\nAirfield layout
Airfield markings
Airfield safe practices', 'NZCF 142, Ch. 2, Sec. 3', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 5, 'Principles of Flight', '1 x 40min Period', 'Enabling objectives:\n Describe the principles and forces of flight\n Instructional objectives:\nBernoulli’s theorem
Aerofoil terminology
The four forces', 'NZCF 142,  Ch. 1, p. 8-9', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 6, 'Flight Controls', '1 x 40min Period', 'Enabling objectives:\n Identify control surfaces and their effects on the axes of movement\n Instructional objectives:\nThree axes of movement
Primary Control Surfaces - Ailerons, Elevators, Rudder
Secondary Control Surfaces - Flaps, Trim
Effects of Controls - Yoke, Pedals', 'NZCF 142,  Ch. 1, Sec. 6', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 7, 'Cockpit Layout', '1 x 40min Period', 'Enabling objectives:\n Identify the instruments and controls in common cockpit layouts\n Instructional objectives:\nFlight Instruments
- Air Speed Indicator
- Attitude Indicator
- Altimeter
- Vertical Speed Indicator
- Heading Indicator
- Turn Indicator
Engine Controls
- Throttle
- Mixture
- Carb Heat
Engine Instruments
- Tachometer
- Temperatures and Pressures (T&P\'s)
- Fuel Quantity
Other instruments', 'NZCF 142, Ch. 2, Sec. 6-7', 'Training Aid available in Training Office
Simulator Avialable for Practical Exercises', 'Aviation Camp'),
                                                                                                                                             ('AVS', 1, 1, 'Effects of controls', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF 142, Ch. 1, p. 10-13', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 2, 1, 'Aviation Careers', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe careers available in aviation
Describe careers available in the RNZAF
Basic requirements', 'NZCF 142, Ch. 2, Sec. 2', '', 'Term 2'),
                                                                                                                                             ('AVS', 2, 1, 'Air Navigation', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF 142, Ch. 3, Sec. 7', '', ''),
                                                                                                                                             ('AVS', 2, 2, 'Propulsion', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe two types of aircraft propulsion
Reciprocating engine
Gas turbine engine', 'NZCF 142 Ch. 2, Sec. 4', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 1, 'Clouds and Precipitation', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nThe 5 cloud types and their associated weather characteristics
Combinations of cloud types
', 'NZCF 142, Ch. 3, Sec. 2', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 2, 'Weather Maps', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIsobars
Cyclones & Anticyclones
Highs & Lows
Ridges & Troughs
Frontal bands (hot, cold, stationary, occluded)', 'NZCF 142, Ch. 3, Sec. 4', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 3, 'Aviation Weather Forecasts', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSources of weather information
Limitations on this information
Aviation Forecasts
- Terminal Aerodrome Forecast (TAF)
- Meteorological Terminal Aviation Routine Weather Report (METAR)', 'NZCF 142, Ch. 3, Sec. 5', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 4, 'Weather Information', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe conditions associated with the symbols outlined above. Include:
Cloud cover
Wind direction and strength
Barometric pressure
Precipitation (type and intensity)', 'MSCM 40 Ch. 9
NZCF 142, Ch. 3, Sec. 2-3
US 20159 Assessor Guide - Ask Training Office', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 5, 'Helicopter Theory', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nHelicopter Configurations
Helicopter Controls', 'NZCF 142, Ch. 3, Sec. 6', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 6, 'Aeronautical Charts', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMaps and Charts
Scales and Symbols', 'NZCF 142, Ch. 3, Sec. 7', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 3, 7, 'Flight Planning', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nProduce a basic flight plan for a flight between a minimum of 3 points
Terminology
Flight planning
Navigation computer
Time/speed/distance
Flight logs', 'NZCF 142, Ch. 3, Sec. 7', '', 'Aviation Camp'),
                                                                                                                                             ('AVS', 4, 1, 'Simulator Instructor Training', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSimulator Security
Start up procedure
Instructor station overview
Instructional procedure
Troubleshooting', '', '', ''),
                                                                                                                                             ('BSH', 1, 1, 'Environmental Care', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhy it is important to care for the environment: Intrinsic, Aesthetic, Scientific, Economic, Social
Maori world view
The New Zealand Environmental Care Code', 'MSCM 40, Ch. 2
For more info visit www.doc.govt.nz – under Parks & recreation: Know before you go: Minimising your impact', 'Rubbish cleanup', 'Term 2'),
                                                                                                                                             ('BSH', 1, 2, 'Clothing and Layering', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMaterial types – advantages and disadvantages
The layering principle
What to wear on your:
Inner layer
Insulation layer
Outer layer
Footwear
Boots
Leather vs. Synthetic
Buying boots
Wearing them in
Boot care
Socks
Gaiters', 'MSCM 40, Ch. 5, Append. IV: clothing and equipment list', 'Fashion show', 'Term 2'),
                                                                                                                                             ('BSH', 1, 3, 'Personal and Group Equipment', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPersonal and Group Equipment
Sleeping bags
Down vs. Synthetic
Sleeping bag care
Ground insulation
Shelter
Tents, bivvy bags, flysheet
Cooking equipment
Stoves, billies, eating utensils, drinking containers
Communication
Mountain radios, personal locator beacons, satellite phones, cellphones
Torches/batteries
Rope
Trekking poles
First aid kits
Navigation equipment
Survival kits', 'MSCM 40, Ch. 6, App. IV,
MSCM 40, Ch.  16, p. 204', 'Rob the nest with equipment', 'Term 2'),
                                                                                                                                             ('BSH', 1, 4, 'Personal First Aid & Survival Kits', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCommon Issues requiring kits
Personal First Aid Kits contents
Survival Kits Contents
Group first aid kits', 'MSCM 40, App. VI, p. 268', 'Build your own kit of the 10 most important items - explain why you chose what you did to the class.', ''),
                                                                                                                                             ('BSH', 1, 5, 'Food, Rat Packs & Cooking', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nClasses of food
Things to consider when planning a menu. To include but not limited to:
Emotional and psychological value
Billies and fuel
Quantity
Emergency food
Breakfast
Lunch/snacks
Dinner
Desserts
Drinks
Avoiding Giardia

Choosing a stove
Types of stoves
Advantages and disadvantages
Stove safety
Cooking
Cleaning up
Helpful cooking hints
Using the Unit cookers', 'MSCM 40 Ch. 7, p. 78 – 81, 84 – 85, 178 - 179', 'Cook a pack or noodles

Give photos or different types of food and cadets have to separate them into meals or food groups.', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 1, 7, 'Packing a Pack', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPack types
Internal Frame
External Frame
Backpack
Choosing a pack
Packing your pack', 'MSCM 40, Ch. 6-7, p. 67 – 71, 85 – 86', '', 'Term 2'),
                                                                                                                                             ('BSH', 1, 8, 'Tents, Shelters, 11x11, 14x14', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPitching the tent
Breaking camp
Hazards
Practical', 'MSCM 40, Ch. 8, p. 91 – 92', 'Go through pitching a tent helping/teaching them as you go (ideally multiple instructors, one per group of 4-5).
Then hold a race between different groups to pitch their tents.
Then if there is time hold a race to pitch their tents with the entire team blindfolded (instructor can hand them pegs etc if they lose them, but no further help than that)', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 1, 9, 'Lost Procedure', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nLosing the Route
Survival Skills
Warmth and Shelter
Water and Food', 'MSCM 40, Ch. 16', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 2, 1, 'Knots & Lashings', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nBowline
Clove Hitch', 'The Ultimate Encyclopedia of Knots and Ropework', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 2, 2, 'Emergency Shelters', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPlastic
Sleeping Bag Cover
Bivvy Bag
Natural Shelters

Site selection
Materials
Structure
Practical', 'MSCM 40, Ch. 8, p. 94-96', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 2, 3, 'Mountain Radios', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe the Mountain Radio Service
Identify the cost to hiring and replacing a Mountain Radio
Identify technical information, including: output power, safety issues
Describe Mountain Radio schedule times, protocols and appropriate language
Identify parts of the radio and antenna
Demonstrate correct Mountain Radio and antenna set up and orientation
Demonstrate use of the mountain Radio to obtain weather information and send a message
Interpreting weather information to maintain safety', '', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 2, 4, 'River Crossing', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRivers are hazardous
Decision making
Preparing to cross
River crossing method – mutual support
Moving across the current
Retreating – caterpillar turn', 'MSCM 40 Ch. 12', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 2, 5, 'Search and Rescue', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\na
Search and rescue
Intentions form
What if I’m overdue
Sending for help
How to help searchers
Working with aircraft

b
SAR techniques
Sound line
Purposeful wandering

c
SAR exercise', 'MSCM 40 p. 215-220, 267', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 3, 1, 'Fire Lighting', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSafety
Materials/ Fire triangle
Fire construction
Fire for survival', 'MSCM 40, Ch. 14', '', 'Bushcraft Camp'),
                                                                                                                                             ('BSH', 3, 2, 'Campsite Selection and Layout', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTypes of shelters- Huts, Tents, Rock Bivouacs
Good features
Features to Avoid
Pitching your tent', 'MSCM 40, Ch. 8', '', 'Bushcraft Camp'),
                                                                                                                                             ('CPL', 4, 1, 'NCO Resources', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCadetnet Manuals
NCO Cabinet
-Leadership and Games booklet
Reading IGs and getting references', 'Cadetnet', '', ''),
                                                                                                                                             ('CPL', 4, 2, 'Training Program', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nReading the Training Program
Lesson Database
-Loggin In
-Receiving the email
-Submitting lesson plans
What to do if you can\'t teach', 'lessons.17squadronatc.com

Copy of training program', '', ''),
                                                                                                                                             ('CPL', 4, 3, 'Marker Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMarker Drill Refresher
-Forming Up
-Marker on Parade', 'NZCF 166, Ch. 1, Sec.1 and Lesson 2', '', ''),
                                                                                                                                             ('CPL', 4, 4, 'Ensign Duty', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nEnsign Location
Raising and Lowering the Ensign
Folding the ensign', '', 'Get them to practice putting the ensign up and down.', ''),
                                                                                                                                             ('CPL', 4, 5, 'Uniform Inspection', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nProcedure for inspection
Sequence of a detailed inspection
Do\'s and Don\'t\'s', 'NZCF 166, Ch. 1, Lesson 1', 'Mock inspections', ''),
                                                                                                                                             ('CPL', 4, 6, 'Duties', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhen to arrive / leave
Going throught the checklist
-Prior to parade
-After break
-End of night
-Cover the possiblility of x3 periods for Basic 1
Duty officer inspection

Gate NCO (note that this is a separate role to Duty NCO)', '', '', ''),
                                                                                                                                             ('DRL', 1, 1, 'Introduction to Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDrill Demonstration
Purpose of drill
Paying Compliments (Salutes, Stand Fast, Room)
Drill terminology', 'NZCF 166
Ch. 1, Lesson. 1, p. 42-43
Ch. 1, section 6, p. 39
Ch. 7, Lesson. 1, p. 245-246', 'At random times during the lesson call \'stand fast\' or room to see if they remember what to do', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 2, 'Positions & Formations', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nEasy, Ease, Attention
How to form up
Rear ranks up', 'NZCF 166, Ch. 1, Sec. 2', 'Get them to mill around in two groups. Then call file, squad or flight. They must race to form the given formation - ideally winners get prizes.', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 3, 'Paces Forwards & Rear', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPaces Forward
Paces Rear
Paces Sideways', 'NZCF 166, Ch. 1, Sec. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 4, 'Dressing, open order, close order', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRight dress
Open and Close Order
Eyes front', 'NZCF 166, Ch. 1, Sec. 3', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 5, 'Marching & Halting', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nQuick march
Halting', 'NZCF 166, Ch. 1, Sec. 4', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 6, 'Wheeling', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWheeling', 'NZCF 166, Ch. 1, Sec. 4', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 7, 'Saluting at the Halt', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSaluting to the Front
Saluting to the Right
Saluting to the Left', 'NZCF 166, Ch. 1, Sec. 5', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 8, 'Turning, Inclining, Falling Out ', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nLeft/right turn
About turn
Left/right inclines
Dismiss/fall out', 'NZCF 166, Ch. 1, Sec. 6', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 9, 'Numbering, Proving & Sizing', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNumbering
Proving
Sizing', 'NZCF 166, Ch. 1, Sec. 7', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 10, 'Side Paces', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSide Paces', 'NZCF 166, Ch. 1, Sec. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 11, 'Eyes Left and Right on the March', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nEyes left/right on the march
Eyes front', 'NZCF 166, Ch. 1, Sec. 8', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 12, 'Saluting on the March', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSaluting to the Front
Saluting to the Right
Saluting to the Left', 'NZCF 166, Ch. 1, Sec. 4', '', ''),
                                                                                                                                             ('DRL', 1, 13, 'Changing Step in Quick Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nChange Step', 'NZCF 166, Ch. 1, Sec. 10', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 14, 'Marking Time in Quick Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMark time
Forward', 'NZCF 166, Ch. 1, Sec. 14', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 1, 15, 'DPTA Positions', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAttention
Ease
Easy
Marching', 'NZCF 166, Ch. 2, Sec. 1', '', ''),
                                                                                                                                             ('DRL', 1, 16, 'Saluting with the DPTA', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSaluting to the Front at the Halt
Saluting to the Right at the Halt
Saluting to the Left at the Halt', 'NZCF 166, Ch. 2, Sec. 2', '', ''),
                                                                                                                                             ('DRL', 1, 76, 'Getting on Parade', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 1, 43, 'Squadron Parade Format', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 2, 1, 'Marching and Halting in Slow Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMarching and Halting in Slow Time
Change step in Slow Time
Turns in Slow Time', 'NZCF 166, Ch. 1, Sec. 9', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 2, 'Changing Step in Slow Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nChange step in Slow Time', 'NZCF 166, Ch. 1, Sec. 10', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 3, 'Turnings in Slow Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTurns in Slow Time', 'NZCF 166, Ch. 1, Sec. 11', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 4, 'Present Arms and Shoulder Arms', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPresent Arms
Shoulder Arms from the Present', 'NZCF 166, Ch. 2, Sec. 3', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 5, 'Saluting with the DPTA', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSaluting to the Front on the March
Saluting to the Right on the March
Saluting to the Left on the March', 'NZCF 166, Ch. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 6, 'Turnings in Quick Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nLeft/Right Turn in Quick Time
About Turn in Quick Time', 'NZAP Ch. 1, Sec. 4, page 1-43', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 7, 'Ground and Take Up Arms', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nGround Arms
Take Up Arms', 'NZCF 166, Ch. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 21, 'Mark Time in Slow Time', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMark Time in Slow Time', 'NZCF 166, Ch. 1', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 2, 27, 'Slope Arms', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSlope Arms from the Shoulder
Shoulder Arms from the Slope
Slope and Shoulder Arms on the March', 'NZCF 166, Ch. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 3, 1, 'Qualities of a Drill Instructor', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nQualities of a Drill Instructor
Producing the Maximum from a Group', 'NZCF 166, Ch. 1, Sec. 2', '', ''),
                                                                                                                                             ('DRL', 3, 2, 'Coaching & Fault Checking', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCoaching
Fault Checking', 'NZCF 166, Ch. 1, Sec. 2', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 3, 3, 'Sequence of a Drill Lesson', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIntroduction
Demonstration
Explanation
Execution
Repetition
Conclusion', 'NZCF 166, Ch. 1, Sec. 2', '', ''),
                                                                                                                                             ('DRL', 3, 4, 'Words of Command', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nParts of Commands (ICE)
Timing of Words of Command
Development of the Word of Command', 'NZCF 166, Ch. 1, Sec. 3', '', ''),
                                                                                                                                             ('DRL', 3, 5, 'Aids to Drill Instruction', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nFormation for Cadet Drill
Position of the Instructor/Student
Time and Pace', 'NZCF 166, Ch. 1, Sec. 4', '', ''),
                                                                                                                                             ('DRL', 3, 6, 'Squad Handling', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSquad handling for each cadet in the lesson', 'NZCF 166, Ch. 1', '', 'Term 2'),
                                                                                                                                             ('DRL', 3, 33, 'Marching in Line', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 3, 34, 'Fault Checking', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF 166, Ch. 1, Sec. 2', '', ''),
                                                                                                                                             ('DRL', 4, 1, 'Squadron Parade Format', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMarker Drill Positions
Flight Sergeant Drill Positions
W/O Drill Positions', 'NZCF 166, Ch. 5, Sec. 4', '', 'Recruit Camp'),
                                                                                                                                             ('DRL', 4, 2, 'Reverse Arms with DPTA', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nReverse Arms from Shoulder
Shoulder Arms from Reverse', 'NZCF 166, Ch. 2, Sec. 6', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 4, 3, 'Order Arms', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nOrder Arms from Shoulder
Shoulder Arms from Order', 'NZCF 166, Ch. 3, Sec. 1', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 4, 4, 'Present Arms and Shoulder Arms from the Present', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPresent Arms
Shoulder Arms from the Present', 'NZCF 166, Ch. 3, Sec. 2', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 4, 5, 'Rest on Arms Reversed', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRest on Arms Reverse
Present Arms from the Rest on Arms Reverse', 'NZCF 166, Ch. 3, Sec. 3, 4', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 5, 1, 'Cenotaph Guard', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF Ch. 3, Sec. 1', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 5, 2, 'Colour Party Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 5, 7, 'Changing Directions by Forming', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 5, 8, 'Changing Directions by Forming Squad', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('DRL', 5, 9, 'Flag Orderly Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF Ch. 6, Sec. 2', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('DRL', 5, 10, 'Flag Bearer Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', 'Prior to ANZAC Day'),
                                                                                                                                             ('ETH', 1, 1, 'NZCF Vision, Mission, Values ', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nVision
Mission
Values', 'NZCF Code of Conduct', '', 'Recruit Camp'),
                                                                                                                                             ('ETH', 1, 2, 'Code of Conduct', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPerformance Shortfall
Misconduct
Serious misconduct
Consequence', 'NZCF Code of Conduct', '', 'Recruit Camp'),
                                                                                                                                             ('ETH', 1, 3, 'Duty of Care & Key Legislation', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDefinitions for Duty of Care (Cadet, Adult, Officer)
NZCF Key Legislation for CaPoC
Obligations of NZCF Personnel
Conduct, Discipline and Punishment', 'Care and Protection of Cadets Policy (under 0-COMMAND in CadetNet)', '', 'Recruit Camp'),
                                                                                                                                             ('ETH', 1, 4, 'Diversity & Anti-Harassment', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDefinitions & Impacts (Discrimination, Harassment)
Elimination of Discrimination and Harassment
Resolution Options for Discrimination or Harassment', 'NZCF 164 EEO and AHA Manual, Ch. 2, Section 1-3', 'Role play what to say/do if someone is being bullied/bullying you.

Give some scenarios: which is bullying which is harassment?', ''),
                                                                                                                                             ('ETH', 1, 7, 'NZCF Key Legislation', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'Care and Protection of Cadets Policy (under 0-COMMAND in CadetNet)', '', ''),
                                                                                                                                             ('ETH', 4, 1, 'Care and Protection of Cadets', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDefinition
Stakeholders
Obligations
Identifying and responding to bullying, harassment and discrimination', 'CFO Vol. 0, Ch. 8, Sec. 1', '', ''),
                                                                                                                                             ('EXP', 4, 1, 'Developing Exercise Objectives', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nExplain the Exercise Planning Unit
Split into groups of 2-3

Choosing an exercise goal/objective
Success criteria:
-Skills
-Knowledge
-Attitude
Aligning your activities with your goal
Choosing behaviours to encourage
Selecting a location

Students write goals/objectives for their activity', '', 'Create your objective and have 2 success criteria per aspect.', ''),
                                                                                                                                             ('EXP', 4, 2, 'Budgeting', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNumber of participants
Activity Costs
Food costs
Cost for students
Location costs
Requesting funding from sources', '', 'Come up with a budget breakdown including cost to participants

How this is done depends on how the EXP unit is being run thi year. If they are planning an actual activity like Sparrowhawk Trainings then its not relevant, so give them an example camp (e.g. Taiaha) to budget for. If they are planning pretend camps/exercises then they should create a budget for that.', ''),
                                                                                                                                             ('EXP', 4, 3, 'Presentation of Concept', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nHow to present your camp/activity idea to the CUCDR / USC.
5 Minute Presentation including:
-Name of exercise
-Location
-Objective
-Numbers and budget
-Activity ideas', '', 'Each group will present their idea to the instructor / the rest of the class. The instructor and other groups can then ask questions etc.', ''),
                                                                                                                                             ('EXP', 4, 4, 'Appreciation Process and Recce', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAppreciation Process
-Timeline for planning
What to look for in a location recce
-Activity locations
-Risks/hazards
-Rain contingencies', 'The Appreciation Process Worksheet', 'If they are planning an actual activity (e.g. sparrowhawk training) then they should do a short recce to decide where they want to run activities (e.g. rogaine)', ''),
                                                                                                                                             ('EXP', 4, 5, 'Timelines and Training Programme', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nBeginning and end times
Meal times
Rotations
Activity progressions- order of activities
Rain contingencies', '', 'Create a training programme for the activity.', ''),
                                                                                                                                             ('EXP', 4, 6, 'Risk Management on an Activity', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPrerequisites for attending an activty
Ratio
Effective supervision (when is it ok for a SNCO to supervise vs when do you need an officer)', '', '', ''),
                                                                                                                                             ('EXP', 4, 7, 'NZCF 11 & 12', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nFilling out an NZCF 11
Filling out an NZCF 12', 'NZCF 161 Sec. 3

Cadetnet.org.nz > Personnel and administration > NZCF Forms > 11/12/Incident severity scale', 'Fill out NZCF 11 & 12 for their activity', ''),
                                                                                                                                             ('EXP', 4, 8, 'Stores & Equipment', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPersonal Equipment Lists
-consider what activities are happening
Group Equipment
-e.g. first aid kits
Activity Equipment', '', 'To create a personal gear list, and required stores list.', ''),
                                                                                                                                             ('EXP', 4, 9, 'Admin / Joining Instructions', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nContents of a joining instruction
-exercise aim
-dates / timings
-travel arrangements
-finanical
-emergency contact
-gearl list
Add activity to cadetnet before handing out JI', 'Example of a joining instruction', 'Create a joining instruction to be given to your participants', ''),
                                                                                                                                             ('EXP', 4, 21, 'Writing Exercise Specific Orders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('EXP', 4, 22, 'Stores & Equipment Requests', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('EXP', 4, 23, 'Timelines', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nBeginning and end times
Meal times
Rotations
Activity progressions- order of activities
Rain contingencies', '', '', ''),
                                                                                                                                             ('EXP', 4, 83, 'Conduct Risk Assessment for an External Activity', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF 161', '', ''),
                                                                                                                                             ('FAS', 1, 1, 'Seven Basic Rules', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nExplain the seven basic rules of the Firearms Safety Code (or TALICSA)', 'NZCF 151, Ch. 1, Sec. 1
NZ Police Arms Code
https://www.police.govt.nz/advice-services/firearms-and-safety/arms-code/seven-firearms-safety-rules', '', 'Recruit Camp'),
                                                                                                                                             ('FAS', 1, 2, 'Safe Handling & Safety Precautions', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCarrying to and from the range
Safety Precautions (approaching an unknown firearm)
Functions Test
Range safety rules', 'NZCF 151, Ch. 2, Sec. 3', '', 'Recruit Camp'),
                                                                                                                                             ('FAS', 1, 3, 'Marlin XT Rifle', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCharacteristics and technical data of the Marlin XT
Parts of the Marlin XT', 'NZCF 151, Ch. 2, Sec. 1', '', 'Recruit Camp'),
                                                                                                                                             ('FAS', 1, 4, 'DFTT\'s', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nProne position, aiming, natural alignment
Details: down, action, instant, fire, unload, for inspection parallel arms, stand clear
Types of shooting: grouping, application, snap', 'NZCF 151, p. 159-160
NZCF 151, Ch. 3, p. 135.', '', 'Recruit Camp'),
                                                                                                                                             ('FAS', 1, 8, 'Safety Precautions', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'NZCF 151, Ch. 2, Lesson 3', '', ''),
                                                                                                                                             ('FAS', 2, 1, 'Types of Firearms and Legal Requirements', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nBolt, Pump, Lever, Semi, etc…
Paintball, airsoft, air rifle.

Firearm and ammunition storage
License classes
Can’t shoot out of vehicles
Transportation', 'NZCF 151, Ch. 1, L. 4', '', ''),
                                                                                                                                             ('FAS', 2, 2, 'Strip, Clean and Assemble', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nHow to strip, clean and assemble
Safety checks once assembled', 'NZCF 151, Ch. 2, L. 1', '', ''),
                                                                                                                                             ('FAS', 2, 3, 'Marksmanship Principles', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPosition and hold
Natural alignment
Aiming
Shot release and follow through', 'NZCF 151, Ch. 2, Sec. 2', '', ''),
                                                                                                                                             ('FAS', 2, 4, 'Scoring of Targets', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nScoring of Targets
Grouping
Application and Snap', 'NZCF 151, Ch. 3, Sec. 5', '', ''),
                                                                                                                                             ('FAS', 3, 1, 'Range Operations, Conduct & Key Appointments', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPlanning a Shoot
Range Appointments', '', '', ''),
                                                                                                                                             ('FST', 5, 1, 'Flight Sergeant Drill/ Flight Management', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCommands for practice
Managing behaviour / standards of a flight', 'NZCF 166, Ch. 5, Lesson 4', 'Get students do a walk-through of flight sergeant drill for parade (do everything as if it was the real thing)', ''),
                                                                                                                                             ('FST', 5, 2, 'W/O Understudy', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nW/O Nightly Duties
Taking the roll
Taking parade', '', '', ''),
                                                                                                                                             ('LDR', 1, 1, 'Understanding Orders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWho can issue orders
Lawful Orders
Unlawful Orders
Illegal Orders
Conflicting Orders
How to clarify/ answer if you believe an order is unlawful', 'NZCF 153, Ch. 6', 'Role play: how to clarify an order.', ''),
                                                                                                                                             ('LDR', 2, 1, 'Introduction to Leadership', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCommand, management, leadership
Attributes of a leader
What leadership provides', 'NZCF 153, Ch. 1', '', ''),
                                                                                                                                             ('LDR', 2, 2, 'Leadership Styles and Approaches', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSituational approach
Functional approach

Autocratic/authoritative
Democratic/participative
Free reign', 'NZCF 153, Ch. 4', '', ''),
                                                                                                                                             ('LDR', 3, 1, 'Command Presence', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nHow you look
How you act
How you communicate
-aggressive vs assertive', 'https://www.firerescue1.com/cod-company-officer-development/articles/command-presence-presentation-is-everything-4k916ZE3o5nmXft0/

https://www.uky.edu/hr/sites/www.uky.edu.hr/files/wellness/images/Conf14_FourCommStyles.pdf

', '', ''),
                                                                                                                                             ('LDR', 3, 2, 'Formal Orders (GSMEAC)', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nGSMEAC Section Breakdown', 'NZCF 153, Ch. 6, Sec. 1', '', ''),
                                                                                                                                             ('LDR', 3, 3, 'GSMEAC Planning', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nStudents will write GSMEACs for fake leadership tasks.', 'NZCF 153, Ch. 6, Sec. 1', '', ''),
                                                                                                                                             ('LDR', 3, 4, 'GSMEAC Activity Presenting', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nStudents will present the GSMEAC briefings they wrote in LDR 3.3.', '', '', ''),
                                                                                                                                             ('LDR', 3, 5, 'Snap Orders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LDR', 3, 6, 'Quick Radio Orders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LDR', 3, 7, 'Informal Brief', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LDR', 3, 8, 'Lead Self and Lead Teams', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMoodle Quizzes
Lead Self
Lead Teams', 'NZCF Moodle', '', ''),
                                                                                                                                             ('LDR', 4, 1, 'Unit Command Roles and Directives', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nUnit Commander
Executive Officer
Flight Commander
Warrant Officer', '', '', ''),
                                                                                                                                             ('LDR', 4, 2, 'Unit Management Roles and Directives', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAdjutant Officer
Training Officer
Stores Officer', '', '', ''),
                                                                                                                                             ('LDR', 4, 3, 'Command Presence (SNCO)', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nValues: Duty, Selfless Service, Honour, Courage
Mental Attributes: Will, Discipline, Initiative, Judgement, Self Confidence, Intelligence, Cultural Awareness
Physical Attributes: Health fitness, Physical Fitness, Professional Bearing
Emotional Attributes: Self-Control, Balance, Stability', 'NZCF 153, Ch. 1, Sec. 1', '', ''),
                                                                                                                                             ('LDR', 4, 4, 'Written Communication', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMinutes
Emails
Letters', 'Defence Force Writing Guide (7-TRAINING, Training Resources in CadetNet)', '', ''),
                                                                                                                                             ('LDR', 4, 5, 'Lead Leaders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LDR', 4, 6, 'Formal Orders', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LDR', 4, 7, 'Administration Management Training Package', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNZCF Forms
Correspondence
Cadet Unit Monthly Returns', 'CFO Vol. 3, Ch. 6', '', ''),
                                                                                                                                             ('LDR', 4, 8, 'Training Management Training Package', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nResponsibilities
Planning to Train
', 'CFO Vol. 7, Ch. 1, Sec. 1', '', ''),
                                                                                                                                             ('LDR', 4, 9, 'Stores and Store Management Training Package', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'CFO Vol. 4, Ch. 1', '', ''),
                                                                                                                                             ('LIS', 1, 1, 'Duke of Edinburgh', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nProgramme outline
Enrolment process', 'www.dofehillary.org.nz

DoE training staff', '', ''),
                                                                                                                                             ('LIS', 2, 1, 'Time Management', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhere to Find the Time
Time Management Strategies
Making Progress
Catching Up
Timetabling', 'https://www.massey.ac.nz/massey/postgraduate/involve/postgraduate-readiness/time-management.cfm', '', ''),
                                                                                                                                             ('LIS', 3, 1, 'Conflict Resolution', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhat is conflict?
The 5 conflict resolution strategies
Active Listening', 'https://www.hrpersonality.com/resources/conflict-management-techniques

https://www.otago.ac.nz/negot/activel.htm', '', ''),
                                                                                                                                             ('LIS', 3, 2, 'Cooking', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nInstructor\'s choice of the following:
- Balanced diets (food groups)
- Knife Skills
- Cooking rice (stove or microwave)
- How to fry an egg
- How to make mash potato
- How to use a BBQ
- Meat safety (eg can it be cooked rare or not)', 'Instructor to draw on personal skills/conduct their own research depending on what they would like to focus on.', '', ''),
                                                                                                                                             ('LIS', 3, 3, 'Safe Driving Practices', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('LIS', 4, 1, 'Tertiary Study', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDeciding to study
Choosing what to attend and what to study
Applications
Finance Options', 'https://school-leavers-toolkit.education.govt.nz/en/tertiary-education/?utm_source=GoogleSearch&utm_medium=TertiaryEducation&utm_campaign=SLTK_Phase3', '', ''),
                                                                                                                                             ('LIS', 4, 2, 'Rental Properties', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nExplain the legal processes involved in renting a house
Flatting etiquette', 'https://sorted.org.nz/guides/planning-and-budgeting/going-flatting/', '', ''),
                                                                                                                                             ('LIS', 4, 3, 'Personal Budgetting', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nProduce a personal budget
Credit/debit cards
Bank accounts', 'https://sorted.org.nz/guides/planning-and-budgeting/budget-dont-fudge-it/', '', ''),
                                                                                                                                             ('MED', 1, 1, 'Primary Survey (DRSABCs)', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDanger
Response (4 levels of response)
Send for Help
Airway
Breathing
Circulation
Defibrillation', 'https://www.sja.org.uk/get-advice/first-aid-advice/how-to/how-to-do-the-primary-survey/

https://www.stjohn.org.nz/first-aid/first-aid-library/immediate-first-aid1/resuscitation/

', 'Pair and group demonstration', ''),
                                                                                                                                             ('MED', 1, 2, 'Secondary Survey (SAMPLE)', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSigns and Symptoms
Allergies
Medication
Past medical history
Last meal
Event', 'https://www.sja.org.uk/get-advice/first-aid-advice/how-to/how-to-do-the-secondary-survey/', 'Pair and group demonstration

Give a patient a ""wound"" (internal or hidden by clothing) which their partner must find throught a secondary survey.', ''),
                                                                                                                                             ('MED', 1, 3, 'Bandaging and Strapping', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRest
Ice
Compression
Elevation

Recognising and treating a rolled ankle
Basic strapping of rolled ankle
Basic strapping of knee', 'https://www.youtube.com/watch?v=okk-rKzTlJ4&ab_channel=rugbynut65
https://www.youtube.com/watch?v=BPbUH4rdKPo&ab_channel=AskDoctorJo
https://www.youtube.com/watch?v=jU-7FDjSaVc&ab_channel=FirstAid4Sport


https://www.stjohn.org.nz/first-aid/first-aid-library/immediate-first-aid1/dressings-and-bandages/', 'Bandage legs together and do 3-legged race.', ''),
                                                                                                                                             ('MED', 1, 4, 'Cuts and Bleeding', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCuts
Bleeding', 'https://www.stjohn.org.nz/first-aid/first-aid-library/bleeding/', '', ''),
                                                                                                                                             ('MED', 2, 1, 'Breaks & Dislocations', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTypes of Fractures/Breaks
Types of Dislocations
Treatment', 'https://www.stjohn.org.nz/first-aid/first-aid-library/fractures-and-dislocations/', '', ''),
                                                                                                                                             ('MED', 2, 2, 'Environmental Related Illness', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nHypothermia
Heat-related Conditions', 'https://www.stjohn.org.nz/first-aid/first-aid-library/immediate-first-aid1/environmental-conditions/', '', ''),
                                                                                                                                             ('MED', 2, 3, 'Burns', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nBurn Procedure', 'https://www.stjohn.org.nz/first-aid/first-aid-library/burns/', '', ''),
                                                                                                                                             ('MED', 2, 4, 'Shock and Anxiety Attacks', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSigns and Symptoms
Treatment', 'https://www.stjohn.org.nz/first-aid/first-aid-library/mental-health-first-aid/', '', ''),
                                                                                                                                             ('MED', 2, 5, 'Asthma & Allergies', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAsthma
Allergies', 'https://www.stjohn.org.nz/first-aid/first-aid-library/asthma/

https://www.stjohn.org.nz/first-aid/first-aid-library/allergic-reaction/', '', ''),
                                                                                                                                             ('MED', 2, 6, 'CASEVAC', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nEmergency Shelters
Improvised Stretchers
Patient Management
Recording of Information', 'https://www.wildernessmag.co.nz/building-bush-shelter/

https://www.realfirstaid.co.uk/improvisedstretcher

https://www.stjohn.org.nz/first-aid/first-aid-library/immediate-first-aid1/emergency-procedures/', '', ''),
                                                                                                                                             ('MED', 3, 1, 'CPR', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAdult Resuscitation
Child Resuscitation
Baby Resuscitation', 'https://www.stjohn.org.nz/first-aid/first-aid-library/resuscitation/', '', ''),
                                                                                                                                             ('MED', 3, 2, 'Accident and Patient Management Roles', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTeam leader
Recorder
First Aiders
Ambulance Notify', '', '', ''),
                                                                                                                                             ('MED', 3, 3, 'Stress & Fatigue', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nGroup Factors
Personal Factors
Preventing Fatigue
Comping with stress and fatigue', 'Unable to find a reference', '', ''),
                                                                                                                                             ('MED', 5, 1, 'Advanced First Aid', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('NAV', 1, 1, 'Map Introduction and Care', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDefinition of a map
Types of maps
Map care
Map information
- Title/reference
- Scale
- Symbols/colours
- Contours
- Relief shading
- Map reliability', 'MSCM 40, Ch. 11, p. 128-130, 132-134', '', ''),
                                                                                                                                             ('NAV', 1, 2, 'Grid References ', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nFour figure grid references
Grid system
Grid lines – eastings and northings
Four figure grid reference
Six figure grid references & scale calculation
Six figure grid references
', 'MSCM 40, Ch. 11, p. 128-130, 132-134
MSCM 40, Ch. 11, p. 134-136', 'Fastest team to find a point on a map.', ''),
                                                                                                                                             ('NAV', 1, 5, 'Measure Distance on a Map', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nInterpret scales
Measure distances on a map
Estimate time
Counting Steps', 'MSC 40 Ch. 11', 'Get cadets to measure the distance of a route on a map.

Get cadets to calculate how long it would take to travel the track (including breaks)

Get cadets to walk 100m and count how many steps it took them (get them to do it with heavy packs if you have extra time / are feeling mean)', 'Term 3'),
                                                                                                                                             ('NAV', 1, 4, 'Bearings', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhat is a bearing?
Obtaining a magnetic bearing (from terrain)
Travelling on a bearing', 'MSCM 40, Ch. 11, p. 126, 139-141, 144-145.', 'Rogaine with grid references (just around the unit building, create your own map grid from satelite view of the block)', ''),
                                                                                                                                             ('NAV', 1, 3, 'Contour Lines', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', 'MSCM 40', '', ''),
                                                                                                                                             ('NAV', 1, 6, 'The Silva Compass', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCardinal points
The three norths
Parts of the Silva compass
Using a compass', 'MSCM 40, Ch. 11, p. 134', 'Build a big compass and play ""pin the red in the shed"" (i.e. pin the tail to the donkey)', ''),
                                                                                                                                             ('NAV', 1, 7, 'Magnetic Variation', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nGrid Bearings
Magnetic Bearings
Conversions

Identifying an object using a bearing', '', 'It is recommended that you use the “add/subtract” method for converting magnetic to grid bearings rather than the one detailed in the MSM.', ''),
                                                                                                                                             ('NAV', 2, 1, 'Orienting a Map', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nOrient to the ground
With a compass (grid lines method and magnetic north arrow method)', '', '', ''),
                                                                                                                                             ('NAV', 2, 2, 'Resections', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('NAV', 2, 3, 'Route Planning', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nComponents of a route card
Complete a route card for a given route', '', '', ''),
                                                                                                                                             ('NAV', 2, 4, 'GPS', '1 x 40min Period', 'Enabling objectives:\n Describe a GPS system and the uses of GPS\n Instructional objectives:\nWhat is GPS
Elements/Components of GPS
How does GPS work
Uses of GPS', 'https://www.geotab.com/blog/what-is-gps/

https://www.nrcs.usda.gov/Internet/FSE_DOCUMENTS/nrcs144p2_024990.pdf

https://www.nh.gov/nhdfl/documents/introduction-to-global-positioning-system.pdf

', 'Could use this video to explain location finding https://www.youtube.com/watch?v=8eTlI19_57g', ''),
                                                                                                                                             ('OPS', 0, 1, 'Recruit Evening Introductory Brefing', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nOverview of the NZCF
NZCF vision, mission and values
Unit organisation
The four year training programme
Unit Camps, courses and activities
Unit support
Enrolment and costs
Parade night routines and emergency evacuation procedures are described
Unit Standing and Fire Orders
Contacting the Unit
Unit tour
Icebreaker exercises', 'NZCF Vision, Mission, Values,
Four year training programme,
Unit organisation chart,
Unit Standing Orders', '', ''),
                                                                                                                                             ('OPS', 1, 1, 'Basic Administration, Unit Processes', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nUnit processes
Cadetnet
Applying for camps', 'www.cadetnet.org.nz
www.17squadronatc.com', 'Take them for a walk down to the offices, and explain what each one does (including pointing out the unit commander\'s office). The most important ones for them to know are training office for camp/activity questions, and adj for general enquiries. Its also important to remind them that they must knock and stand at attention (and for unit commanders office put their hat on and salute).', 'Recruit Camp'),
                                                                                                                                             ('OPS', 1, 2, 'Unit Structure', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIntroduction of each office (take them for a walk and show them each office)
Introduction of each team (Officers, W/O NCO’s, year Levels) and their application towards cadets', 'www.17squadronatc.com', '', 'Recruit Camp'),
                                                                                                                                             ('OPS', 1, 3, 'Uniform Wear, Care & Maintenance', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDifferent types of uniform
No. 8 Cadet Working Dress
No. 6 General Purpose Short Sleeved Shirt
PT Kit
Jewellery/ Make up
Hygiene

Practical How to care for uniform
Shoes
Ironing
Hair (male and female)', 'CFO Vol. 4, Ch. 3', 'Stand rotations for each uniform item where an NCO shows how to iron/care for it.', 'Recruit Camp'),
                                                                                                                                             ('OPS', 1, 4, ' ATC Specific Ranks', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCadet Ranks
Non-Commissioned Officers
Commissioned Officers
Other Corps of NZCF', 'CFO Vol. 0, Ch. 7, Sec. 1', 'Giant memory game (carpet squares?)

Make officer ranks out of pasta
- PLTOFF: spaghetti
- FGOFF: fettucinni
- FLTLT: double fettucinni
- SQNLDR: fettucinni, spaghetti, fettucinni', ''),
                                                                                                                                             ('OPS', 1, 5, 'Unit History', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nUnit History', 'www.cadetnet.org.nz,
www.17squadronatc.com', '', ''),
                                                                                                                                             ('OPS', 1, 6, 'Cadet Awards & Badges', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nYear group badges
Shooting Badges
Flying/ Navigation Badges
DOE Badges
Cadet of the Year', 'NZCF 160 Ch. 1, Sec. 1', '', ''),
                                                                                                                                             ('OPS', 1, 7, 'Camp & Base Locations and Purposes', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe the location and role of RNZAF bases, Units and Squadrons
RNZAF Base Auckland
RNZAF Base Ohakea
RNZAF Base Woodbourne', 'http://campsandbases.nzdf.mil.nz/our-camps-and-bases', 'Pin the camp on the map', ''),
                                                                                                                                             ('OPS', 1, 7, 'Camps, Ships and Bases', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRNZN Ships (Base equivalent, not vessels)
NZ Army Camps
RNZAF Bases
', 'NZCF 167, p. 38, 41, 118', '', ''),
                                                                                                                                             ('OPS', 1, 8, 'RNZAF Aircraft', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nA109 Light Utility Helicopter
Boeing 77-2K2
C-130H Hercules
King Air 350
NH90 Helipcoter
P-3K2 Orion
SH-2G Seasprite Helicopter
T-6C Texan II', 'https://www.nzdf.mil.nz/air-force/capability/', 'Group information sheet. Have to create a poster advertising their aircraft

Inside the Texan:
https://www.youtube.com/watch?v=SK8-BVPKo_c', ''),
                                                                                                                                             ('OPS', 2, 2, 'NZCF Ranks', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSCC Ranks
NZCC Ranks', 'CFO Vol. 0, Ch. 7, Sec 1, 2', '', ''),
                                                                                                                                             ('OPS', 2, 3, 'RNZAF Ranks', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRNZAF NCO Ranks
RNZAF Junior Officer Ranks
RNZAF Senior Officer Ranks', '', '', ''),
                                                                                                                                             ('OPS', 2, 4, 'NZCF Units', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nATC Units
NZCC Units
SCC Units', 'https://www.cadetforces.org.nz/units.html', '', ''),
                                                                                                                                             ('OPS', 2, 5, 'Courses, Competitions & Selection Processes', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAnnual NZCF courses and competitions are described:
- JNCO
- SNCO
- Gliding
- National Aviation - Powered Flying
- National Aviation - Navigation
- RNZAF Flying Immersion
- Air Skills & Sparrowhawk
- Efficiency Competition
- Wallingford, Ffennell, and Jock Turner Shooting Competitions', 'NZCF 160
Annual Training Programme - Intranet Section 7', '', ''),
                                                                                                                                             ('OPS', 2, 6, 'NZCF & NZDF History', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNZCF History
NZDF History and Deployments', '', '', ''),
                                                                                                                                             ('OPS', 2, 7, 'Equipment, Weapon Systems, Vehicles', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNZ Navy Equipment, Weapon Systems, Vehicles
NZ Army Equipment, Weapon Systems, Vehicles
RNZAF Equipment, Weapon Systems, Vehicles', 'https://www.nzdf.mil.nz/navy/capability/
https://www.nzdf.mil.nz/army/capability/
https://www.nzdf.mil.nz/air-force/capability/', '', ''),
                                                                                                                                             ('OPS', 2, 8, 'NZCF Awards, Commendations and Medals', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nAwards available in the NZCF are described:
Efficiency
McPherson Trophy
RNZRSA Community Services Award
Cadet commendation
Commandant’s commendation
Commandant’s medallion
Chief of Air Force commendation
The Cadet Forces Medal', 'NZCF 160', '', ''),
                                                                                                                                             ('OPS', 3, 1, 'Manuals and CadetNet', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCadet Force Orders
NZCF Manuals
Annual Traning Programme
', 'www.cadetnet.org.nz', '', ''),
                                                                                                                                             ('OPS', 3, 2, 'RNZAF Trades', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nOverview of trades available
Focus on specific entry and school subject requirements
Pathways for applying', 'https://defencecareers.mil.nz/defence-careers/', '', ''),
                                                                                                                                             ('OPS', 3, 3, 'NZDF Structure', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNZDF Structure
NZDF Key Personnel', 'NZCF 167, p. 38

https://www.nzdf.mil.nz/nzdf/about-us/
https://www.nzdf.mil.nz/navy/about-us/
https://www.nzdf.mil.nz/army/about-us/
https://www.nzdf.mil.nz/air-force/capability/', '', ''),
                                                                                                                                             ('OPS', 3, 4, 'NZDF Medals, Citations and Decorations', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nMedals
Citations
Decorations', '', '', ''),
                                                                                                                                             ('OPS', 3, 5, 'NZDF Ranks', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRNZN Ranks
NZ Army Ranks', 'https://en.wikipedia.org/wiki/New_Zealand_military_ranks', '', ''),
                                                                                                                                             ('OPS', 4, 1, 'NZDF Current Operations', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nCurrent NZDF Operations', 'https://www.defence.govt.nz/what-we-do/diplomacy-and-deployments/deployment-map/', '', ''),
                                                                                                                                             ('OPS', 5, 1, 'NZCF Haka', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nNZCF Haka', '', '', ''),
                                                                                                                                             ('OPS', 5, 2, 'Dining In', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDining In Procedures', '', '', ''),
                                                                                                                                             ('PHY', 1, 1, 'Warming Up and Dowm', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWarm Ups
Warm Downs
Important Muscle Groups', 'https://www.nhs.uk/live-well/exercise/stretch-before-exercising/
https://www.nhs.uk/live-well/exercise/how-to-warm-up-before-exercising/', '', ''),
                                                                                                                                             ('PHY', 1, 2, 'Basic PT Techniques', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nExercise Techniques:
- Push ups
- Curl Ups
- Prone Hold
- Squats
- Lunges', 'https://defencecareers.mil.nz/defence-careers/how-do-i-join/fitness-standards/', '', ''),
                                                                                                                                             ('PHY', 1, 3, 'Beep Test', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nStrategy
Beep Test', '', '', ''),
                                                                                                                                             ('PHY', 1, 4, 'Required Fitness Level (RFL)', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n2.4 km Run
Press Ups
Curl Ups', 'https://defencecareers.mil.nz/defence-careers/how-do-i-join/fitness-standards/', '', ''),
                                                                                                                                             ('PHY', 1, 5, 'Safe Handling & Lifting Techniques', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nSafe Lifting Techniques
Lifting', 'https://www.sitesafe.org.nz/guides--resources/practical-safety-advice/manual-handling/#:~:text=Carry%20out%20the%20lift%20smoothly,to%20avoid%20back%2Fbody%20strain.', '', ''),
                                                                                                                                             ('PHY', 1, 6, 'Tug-of-War', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRules
Techniques', 'https://www.youtube.com/watch?reload=9&v=6YNLwicEaG4', '', ''),
                                                                                                                                             ('PHY', 5, 1, 'Circuit Training', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\n', '', '', ''),
                                                                                                                                             ('PHY', 5, 2, 'Sports', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTouch
Indoor Sports
Climbing
Self Defence', '', '', ''),
                                                                                                                                             ('RCD', 1, 1, 'Radios', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIdentify parts of the Squadron radios
Describe daily maintenance and re-charge procedures
Describe set up procedures to obtain best coverage and reception
Select the correct channel or frequency
Demonstrate message transmission and reception using correct Radio Telephone Procedures (language and protocols)
Calling
Answering
Send/receive in difficult conditions', 'NZCF 159 RATEL Manual, part four – Air Training Corps Ch. 1, para. 4.1.11, 4.1.12, 4.3.9 – 4.3.12, 4.6.14', '', ''),
                                                                                                                                             ('RCD', 1, 2, 'Figures, Phonetics and Prowords', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPhonetic alphabet & Figures (pronounciation)
Describe correct transmission of numbers
24 Hour Time', 'NZCF 159 RATEL Manual, part four – Air Training Corps, Ch. 2', '', ''),
                                                                                                                                             ('RCD', 1, 3, 'Prowords and Procedures', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nOutline common pro-words and appointment titles
Initial calls – radio checks', 'NZCF 159 RATEL Manual, part four – Air Training Corps, Ch. 2', '', ''),
                                                                                                                                             ('RCD', 3, 1, 'Radio Nets', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nDescribe elements of a radio net
Net Control Station
Sub station
Diagram
Describe steps in establishing a radio net
Preliminary instructions
Initial calls – radio checks
Describe the process of joining a working net
Describe the process of closing down
Establish a radio net – must consist of at least one NCS and three substations
includes:
net diagram
all required data for a net', 'NZCF 159, Ch. 3, Sec. 4', '', ''),
                                                                                                                                             ('RCD', 3, 2, 'Relays & Messages', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nRelay procedure – pro-words
Relay to
Through me
Cancelling messages
Grid references
Urgent messages', 'NZCF 159, Ch. 3, Sec. 9', '', ''),
                                                                                                                                             ('SAL', 1, 1, 'Introduction to public speaking', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nVoice production
Aids to good speech
Tips for dealing with anxiety
Practical', 'NZCF 150, Ch. 5, Sec. 1, p. 62', '', ''),
                                                                                                                                             ('SAL', 2, 1, 'Speech Structure', '1 x 40min Period', 'Enabling objectives:\n Explain the basic structure of an Oral Presentation\n Instructional objectives:\nStructure of a speech
Speech Delivery', 'NZCF 150, Ch. 10, Sec. 1', 'Practical Speeches', ''),
                                                                                                                                             ('SAL', 3, 1, 'Instructor Roles and Responsibilities', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nKnow your students
Presentation of Material
Personal Manner
Learning Environment', 'NZCF 150, Ch. 2, Sec. 1', '', ''),
                                                                                                                                             ('SAL', 3, 2, 'Qualities of an Instructor', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nQualities of a Good Instructor
•	Confidence
•	Manner
•	Attitude
•	Diligence
•	Enthusiasm
•	Mana

Training Principles
•	Relevance
•	Sensibleness
•	Challenge
•	Competition
•	Humour
•	Accountability
•	Equity
•	Respect
•	Discipline', 'NZCF 150, Ch. 3, Sec. 1-2
', '', ''),
                                                                                                                                             ('SAL', 3, 3, 'Lesson Plans', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIntroduction
•	INTROSH
•	Objectives
Body
•	Explanations
•	Activities
•	Questions
•	Progressive Summaries

Conclusion
•	TENSION', 'NZCF 150, Ch. 4, Sec. 2', '', ''),
                                                                                                                                             ('SAL', 3, 4, '9 Steps of Instruction', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nThe 8 Steps of Lesson Planning
•	Establish the objective
•	Specification of training objectives
•	Conduct research
•	Establish the best learning sequence
•	Choose the instructional method
•	Develop the training aids
•	Run the lesson
•	Assess the lesson
•	Revise the plan', 'NZCF 150, Ch. 4, Sec. 1', '', ''),
                                                                                                                                             ('SAL', 3, 5, 'Questioning Techniques', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIntroduction to Questioning
Types of Questions
How to use Questions', 'NZCF 150, Ch. 5, Sec. 1', '', ''),
                                                                                                                                             ('SAL', 3, 6, 'Feedback - Feedback and Delivery', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhat is feedback?
Method
Feedback Techniques
- Positive and Negative
- Quality
- Timing
- Balance
- Be a member of the audience
- Set up', 'NZCF 150, Ch. 9, Sec. 2', '', ''),
                                                                                                                                             ('SAL', 3, 7, 'Training Aids', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nTypes of Training Aids
Uses of training aids
Planning with training aids', 'NZCF 150, Ch. 6', '', ''),
                                                                                                                                             ('SAL', 3, 8, 'Delivering Practical Lessons', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nIDEERC sequence, teaching knot lessons
Planning Lessons
Delivering Practical Lessons', 'NZCF 150, Ch. 4, Sec. 2', '', ''),
                                                                                                                                             ('SAL', 4, 1, 'Characteristics of a Learner', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nLearning Styles
- Visual
- Auditory
- Kinaesthetic


Learning Needs
- Visual
- Auditory
- Kinaesthetic', 'NZCF 150, Ch. 2, Sec. 2', 'Feel free to use NZCF 150, Ch. 2, Sec. 2, Annex. B to check for V. A. K dominance of the cadets', ''),
                                                                                                                                             ('SAL', 4, 2, 'Assessment', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nPrinciples of Assessment
T ypes of Assessment
Evidence', 'NZCF 150, Ch. 7, Sec. 1-2', '', ''),
                                                                                                                                             ('SGT', 5, 1, 'Orderly Duty', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhen to arrive / leave
Orderly NCO checklist
What to do if a parent does not pick up cadet at end of night.', '', '', ''),
                                                                                                                                             ('SGT', 5, 2, 'Supernumary Drill', '1 x 40min Period', 'Enabling objectives:\n \n Instructional objectives:\nWhere to stand
How to switch sides', 'NZCF 166, Sec. 1 Ch. 1 and Ch. 5, Lesson 4', '', '');

#date are inserted as year, month, day
#entry 3 is important as it is used for testing
INSERT INTO `lesson_allocations` (`lesson_id`, `year_group`, `period`, `date`, `state_id`) VALUES
                                                                                               (1, 2, 3, '23/5/12', 1),
                                                                                               (1, 2, 2, '23/3/12', 1),
                                                                                               (1, 2, 3, '23/6/6', 1),
                                                                                               (4, 4, 1, '23/6/1', 1);

#entry 5 is important for testing
INSERT INTO `allocated_instructors` (`allocation_id`, `instructor_id`) VALUES
                                                                           (1, 3),
                                                                           (1, 4),
                                                                           (2, 7),
                                                                           (3, 10),
                                                                           (4, 7);