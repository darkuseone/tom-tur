"""Звук выпуска 001: точечные SFX и атмосферы, привязанные к таймлайну реплик. Читает tools/mix.py.
T: LS(k) — начало реплики, LF(k, f) — доля реплики, S0/S1 — начало/конец сцены, DUR — длина.
SFX: (имя файла в assets/sfx без .mp3, время, поправка громкости дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    LS, LF, S0, S1, DUR = T.LS, T.LF, T.S0, T.S1, T.DUR
    knock = LS('r1') + 0.9; split = LF('g1', .42); sniff = LF('d1', .42); b1 = LS('i2') + 0.85; melt = LS('i2') - 0.05
    sfx = [('glacier_groan', 0.0, 0), ('whip_whoosh', 0.95, -6), ('clock_tick_heavy', LS('h2') + 0.15, -4), ('portal_open', S0['tunnel'] - 0.45, 0), ('time_zoom', S0['tunnel'] - 0.1, -3),
           ('teleport_pop', S0['rock'] - 0.02, 2), ('rock_knock', knock, 0), ('time_zoom', S0['globe'] - 0.2, -2), ('tectonic_split', split, 0), ('time_zoom', S0['dino'] - 0.45, -1),
           ('dino_steps', S0['dino'] + 0.3, -2), ('dino_snort', sniff, 0), ('ice_shatter', S0['ice'] - 0.25, 0), ('ice_slide', S0['ice'] + 0.4, -4),
           ('boulder_drop', b1, 0), ('boulder_drop', b1 + 0.35, 1), ('boulder_drop', b1 + 0.7, -2), ('whip_whoosh', S0['lenape'] - 0.2, 0), ('wind_gust', S0['dutch'] - 0.35, -1),
           ('ship_bell', S0['dutch'] + 0.3, -5), ('coins_pouch', LF('n1', .3), -3), ('coins_pouch', S0['bridge'] - 0.3, -6), ('teleport_pop', S0['bridge'] + 0.1, 0), ('elephants', S0['bridge'] + 0.4, -3),
           ('crowd_cheer', LF('b1', .8), -8), ('shimmer', S0['liberty'] - 0.15, -6), ('shimmer', LF('s1', .4), -4), ('time_zoom', S0['empire'] - 0.4, 0), ('rivets_steel', S0['empire'] + 0.2, -6),
           ('rewind', S0['today'] - 0.3, -6), ('crowd_cheer', S0['today'] + 0.4, -10), ('time_zoom', LF('n2', .5), -3), ('portal_open', S0['button'] - 0.35, 0),
           ('clock_tick_heavy', LS('x1') + 0.4, -4), ('portal_open', LS('x1') + 0.4, -6), ('clock_tick_heavy', DUR - 1.1, -6)]
    beds = [('city_loop', 0, S0['tunnel'] + 0.2), ('cave_drip_loop', S0['rock'], S1['rock']), ('jungle_loop', S0['dino'], S1['dino']), ('blizzard_loop', S0['ice'], melt + 0.4),
            ('forest_loop', S0['lenape'], S1['lenape']), ('city_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_loop')
