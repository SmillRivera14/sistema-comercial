using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_comercial.Models;
using Sistema_comercial.Models.DTOs;

namespace Sistema_comercial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly SistemaComercialContext _context;

        public UsuariosController(SistemaComercialContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            var DTO = usuarios.Select(u => new UsuarioDTO
            {
                Id = u.Id,
                Nombre = u.Nombre,
                PasswordHash = u.PasswordHash,
                Email = u.Email
            }).ToList();

            return Ok(DTO);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetById (int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            var DTO = new UsuarioDTO
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                PasswordHash = usuario.PasswordHash,
                Email = usuario.Email
            };

            return Ok(DTO);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetByName(string email)
        {
            var result = await _context.Usuarios.Where(x => x.Email.Contains(email)).ToListAsync();

            return email == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Usuario usuario)
        {
            var ExistedRol = await _context.Roles.AnyAsync(r => r.Id == usuario.RolId);

            var ExistedEmail = await _context.Usuarios.AnyAsync(r => r.Email == usuario.Email);

            if (ExistedEmail) return BadRequest($"Este Email {usuario.Email} ya tiene una cuenta");

            if (!ExistedRol)
            {
                return BadRequest("El Rol especificado no existe");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                _context.Add(usuario);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Create), new { id = usuario.Id }, usuario);
            }catch(Exception ex)
            {
                var innerMessage = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("Error al guardar usuario: " + innerMessage);
            }

        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Usuario usuario, int id)
        {
            if(usuario.Id != id)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;
            try 
            {
                await _context.SaveChangesAsync();
                return Ok(usuario);
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult>Delete (int id)
        {
            var user = await _context.Usuarios.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            _context.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
