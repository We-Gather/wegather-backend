package kr.wegather.wegather.config;

import kr.wegather.wegather.auth.JwtAuthenticationFilter;
import kr.wegather.wegather.auth.JwtAuthorizationFilter;
import kr.wegather.wegather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CorsConfig corsConfig;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.addFilter(corsConfig.corsFilter())
				.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.formLogin().disable()
				.httpBasic().disable()

				.addFilter(new JwtAuthenticationFilter(authenticationManager()))
				.addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
//<<<<<<< HEAD
			.authorizeRequests()
				.antMatchers("/login", "/login/**", "/user/signup", "/school/**","/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll()
				.anyRequest().authenticated();
//=======
//				.authorizeRequests()
//				.antMatchers("/login/**")
//				.access("hasRole('GUEST') or hasRole('USER') or hasRole ('ADMIN')")
//				.anyRequest().permitAll();
//>>>>>>> 78ecc5b0cff6e819b4f66129e358c2b148147798
	}
}


